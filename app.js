const express = require('express');

const userRouter = require('./routes/userRoutes');
const beansRouter = require('./routes/beansRoutes');

const app = express();

// Globala Middleware

// Begränsar max storleken på payloaden.
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Lägger till en tidstämpel på varje request.
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes
app.use('/api/beans', beansRouter);
app.use('/api/user', userRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'success',
    message: `Kan inte hitta ${req.originalUrl} på den här servern.`,
  });
});

module.exports = app;
