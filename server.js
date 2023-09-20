const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const { DATABASE_USER, DATABASE_PASSWORD, DATABASE_SERVER, DATABASE_CONNECTION } = process.env;
const DB_URL = `${DATABASE_CONNECTION}${DATABASE_USER}:${DATABASE_PASSWORD}${DATABASE_SERVER}`;

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB-anslutningen lyckades.');
  })
  .catch((err) => {
    console.error('DB-anslutningen misslyckades.', err);
    process.exit();
  });

const port = 3000;
app.listen(port, () => {
  console.log(`App lyssnar på port ${port}...`);
});
