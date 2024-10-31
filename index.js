require("dotenv").config();
const { app } = require("./src/server");

app.listen(process.env.APP_PORT || 3001, () => {
  console.log(`Server is running at port: ${process.env.APP_PORT || 3001}`);
});
