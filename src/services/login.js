const jwt = require("jsonwebtoken");
const UserModel = require("../models/Users");
const HttpResponseError = require("../utils/HttpResponseError");

const generateAcessToken = (payload) => {
  const acessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  return acessToken;
};

const login = async (email, password) => {
  try {
    const user = await UserModel.getUserEmailAndPassword(email, password);

    if (!user || user.length <= 0) {
      throw new HttpResponseError.UnauthorizedError(
        "Username or password is incorrect!",
      );
    }

    const resultUser = {
      name: user[0].name,
      email: user[0].email,
      userId: user[0].user_id,
    };

    // Gera o acessToken como as credenciais do usuário como payload
    const acessToken = generateAcessToken(resultUser);

    // Retorna as credenciais do usuário e o acessToken e refreshToken formado
    const result = {
      user: resultUser,
      acessToken: acessToken,
    };

    return result;
  } catch (error) {
    console.error(error?.message);
    throw error;
  }
};

module.exports = {
  login,
  generateAcessToken,
};
