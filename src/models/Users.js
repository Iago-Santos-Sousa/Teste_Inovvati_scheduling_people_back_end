const { dbSchedule, withTransaction } = require("../db/dataBase");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

const createUser = async (name, email, password) => {
  try {
    let userId = 0;

    await withTransaction(dbSchedule, async (connection) => {
      const hashPassword = bcrypt.hashSync(password, salt);
      const query = `INSERT INTO scheduling.users (name, email, password) VALUES (?, ?, ?)`;
      const params = [name, email, hashPassword];
      const [user] = await connection.query(query, params);
      userId = user.insertId;
    });

    return userId;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const findUser = async (email) => {
  try {
    const paras = [email];
    const query = `SELECT user_id, name, email FROM scheduling.users WHERE email = ?`;
    const [result] = await dbSchedule.query(query, paras);
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getUserEmailAndPassword = async (email, password) => {
  try {
    const query = `SELECT user_id, name, email, password FROM scheduling.users WHERE email = ?`;
    const params = [email];
    const [results] = await dbSchedule.query(query, params);

    if (!results || results.length === 0) {
      return null;
    }

    // Faz a comparação da senha do usuário com o hash do bcrypt
    const passwordResult = await bcrypt.compare(password, results[0].password);

    if (!passwordResult) {
      return null;
    }

    return results;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getUserByEmail = async (email) => {
  try {
    const queryString = `SELECT user_id, name, email FROM scheduling.users WHERE email = ?`;
    const [emailUser] = await dbSchedule.query(queryString, [email]);
    return emailUser;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = {
  createUser,
  getUserEmailAndPassword,
  findUser,
  getUserByEmail,
};
