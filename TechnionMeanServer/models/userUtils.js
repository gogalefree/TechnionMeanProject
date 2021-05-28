const User = require('./userModel');

exports.getAllUsers = function () {
  return new Promise((resolve, reject) => {
    User.find({}, function (err, data) {
      if (err) {
        console.log('err :>> ', err);
        reject(err);
      } else {
        console.log('data :>> ', data);
        resolve(data);
      }
    });
  });
};

exports.getUser = function (id) {
  return new Promise((resolve, reject) => {
    User.findById(id, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

exports.updateUser = function (userToUpdate, data) {
  return new Promise((resolve, reject) => {
    userToUpdate.name = data.name;
    userToUpdate.email = data.email;
    userToUpdate.street = data.street;
    userToUpdate.city = data.city;
    userToUpdate.zipCode = data.zipCode;
    userToUpdate.tasks = data.tasks;
    userToUpdate.posts = data.posts;
    userToUpdate.save(function (err, updated) {
      if (err) {
        reject(err);
      } else {
        resolve(updated);
      }
    });
  });
};

exports.deleteUser = async function (user) {
  console.log('deleting: ' + user);
  try {
    await user.remove();
    return { message: 'User deleted!' };
  } catch (err) {
    return { message: err.message };
  }
};

exports.createUser = function (user) {
  return new Promise((resolve, reject) => {
    let u = new User(user);
    u.save(function (err, newUser) {
      if (err) {
        reject(err.message);
      } else {
        resolve(newUser);
      }
    });
  });
};
