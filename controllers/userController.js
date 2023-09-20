const jwt = require('jsonwebtoken');

const { promisify } = require('util');

const User = require('../models/userModel');

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.SECRET, { expiresIn: process.env.JWTEXPIRATION });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  // Tar bort lösenordet innan användardata skickas tillbaka som svar.
  user.password = undefined;
  user.passwordConfirm = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    createSendToken(newUser, 201, req, res);
  } catch (err) {
    res.status(400).json({
      status: 'error',
      message: err.message,
    });
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).select('+password');

    // Om användaren inte finns eller lösnordet är fel.
    if (!user || !(await user.correctPassword(password, user.password))) {
      res.status(401).json({
        status: 'error',
        message: 'Felaktigt användarnamn eller lösenord.',
      });
    } else {
      // Om allt är ok!
      createSendToken(user, 200, req, res);
    }
  } catch (err) {
    // Kolla om lösenord och username finns med i bodyn.
    if (!username || !password) {
      res.status(400).json({
        status: 'error',
        message: 'Vänligen ange användarnamn och lösenord.',
      });
    }
  }
};

exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.replace('Bearer', '').replace(' ', '');
  }
  try {
    // Validera token.
    const decoded = await promisify(jwt.verify)(token, process.env.SECRET);

    const user = await User.findById(decoded.id);

    // req.user = användardata finns tillgängling i nästa req.
    req.user = user;

    // Nu får användaren access till protected route.
    next();
  } catch (err) {
    res.status(401).json({
      status: 'error',
      message: 'Du är inte inloggad.',
    });
  }
};
