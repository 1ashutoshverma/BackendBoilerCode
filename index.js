const express = require("express");
const cors = require("cors");
const { connection } = require("./configs/db");
const { userController } = require("./controllers/user.routes");
const { authentication } = require("./middlewares/authentication");
const { employeeController } = require("./controllers/employee.routes");

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "server is running" });
});

app.use("/user", userController);

app.use(authentication);

app.use("/employee", employeeController);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("DB is connected");
  } catch (error) {
    console.log("Error while connection to db");
    console.log(error);
  }
  console.log("server is running");
});
