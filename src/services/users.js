const UserModel = require("../models/Users");
const HttpResponseError = require("../utils/HttpResponseError");

const createUser = async (name, email, password) => {
  try {
    const existUser = await UserModel.findUser(email);

    if (existUser && existUser.length > 0) {
      throw new HttpResponseError.ExistResourceError(
        "There is already a user with this email!"
      );
    }

    const userId = await UserModel.createUser(name, email, password);

    return userId;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
};
