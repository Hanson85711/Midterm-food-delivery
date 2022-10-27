const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      //console.log(data.rows);
      return data.rows;
    });
};

const getAdminPhone = () => {
  return db.query(`SELECT phone FROM users
  WHERE type = 'admin';`)
}

module.exports = { getUsers, getAdminPhone };
