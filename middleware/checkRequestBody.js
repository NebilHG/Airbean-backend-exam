const checkRequestBody = (req, res, next) => {
  const requestBody = req.body;
  let hasInvalidObject = false;

  if (!Array.isArray(requestBody)) {
    return res.status(400).json({
      status: 'fail',
      message: 'Request body måste vara en array med objekt.',
    });
  }

  requestBody.forEach((object) => {
    if (!object.hasOwnProperty('_id') || !object.hasOwnProperty('quantity')) {
      hasInvalidObject = true;
    }
  });

  if (hasInvalidObject) {
    return res.status(400).json({
      status: 'fail',
      message: 'Request body måste innehålla _id och quantity.',
    });
  }
  next();
};

module.exports = checkRequestBody;
