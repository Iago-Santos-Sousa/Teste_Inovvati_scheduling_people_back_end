const router = require("express").Router();
const userService = require("../services/users");
const HttpResponseError = require("../utils/HttpResponseError");

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new HttpResponseError.BadRequestError("Credentials is missing!");
    }

    const user = await userService.createUser(name, email, password);

    if (!user) {
      throw new HttpResponseError.NotAcceptableError("Unable to create user!");
    }

    res
      .status(201)
      .json({ status: "success", message: "User created successfully!" });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "error",
      message: error.messageResponse || "Internal server error.",
    });
  }
});

module.exports = router;
