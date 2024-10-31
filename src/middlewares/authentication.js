const jwt = require("jsonwebtoken");

// Lista de endpoint sem autenticação
const unsecuredRoutes = ["/sign", "/signup"];

const authenticateToken = (req, res, next) => {
  const unsecuredRoute = unsecuredRoutes.find((a) => req.path.includes(a));

  if (unsecuredRoute) {
    // Se for uma rota que não precisa de autenticação passa o controle para a próxima rota
    next();
    return;
  }

  const authHeader = req.headers["authorization"]; // Recebe o token do cabeçalho
  const token = authHeader && authHeader.split(" ")[1]; // Recebe o token do cabeçalho

  if (!token) {
    return res
      .status(403)
      .json({ status: "error", message: "Token not provided!" });
  }

  // Faz a verificação do token recebido no cabeçalho
  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
    if (err) {
      req.user = null;
      return res
        .status(403)
        .json({ status: "error", message: "Unauthorized user!" });
    }

    // Se for válido coloca o token decodificado na request
    req.user = decode;
    next();
  });
};

module.exports = authenticateToken;
