const getUserDetails = (users, userId) => {

  for (const user of users) {
    if (Number(userId) === user.id) {
      return user.type
    }
  }
};

module.exports = { getUserDetails }
