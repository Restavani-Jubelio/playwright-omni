require('dotenv').config();

const environment = {
  baseUrl: process.env.BASE_URL,
  apiBaseUrl: process.env.API_BASE_URL,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  headless: process.env.HEADLESS !== 'false'
};

module.exports = { environment };