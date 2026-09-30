const { faker } = require('@faker-js/faker');

const users = {
  standard: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD
  }
};

function createRandomUser() {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    username: faker.internet.username(),
    password: faker.internet.password({ length: 12 })
  };
}

module.exports = {
  users,
  createRandomUser
};