const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    passward: process.env.DB_PASS,
    database: process.env.DB_NAME
  }
});

function createUser(user) {
  return db('users')
  .insert({user_name:user.user_name})
    .returning('*')
}

function updateScore(user_name , score) {
  return db('users')
    .update('score', score)
    .where({ user_name: user_name })
    .returning('*')
}

module.exports = {
  createUser,
  updateScore,
};



