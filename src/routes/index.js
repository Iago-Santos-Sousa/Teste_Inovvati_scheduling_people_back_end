const router = require("express").Router();
const loginRouter = require("./login");
const usersRouter = require("./users");
const scheduleRouter = require("./schedule");
const authenticateToken = require("../middlewares/authentication");

// Aplicar o middleware de autenticação a todas as rotas
router.use(authenticateToken);

// Rota de login
router.use("/sign", loginRouter);

// Rota de usuários
router.use("/users", usersRouter);

// Rota de agendamentos
router.use("/schedule", scheduleRouter);

module.exports = router;
