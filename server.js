const express = require("express");
const app = express();
const dotenv = require("dotenv");
const createError = require("http-errors");
const DataBaseCon = require("./Config/DatabaseCon");
const indexRoutes = require("./Routes/indexRoute");
const cookieParser = require("cookie-parser");

// !----------------------------------------------------

// TODO : To configure the dotenv
dotenv.config({ path: "./Config/config.env" });

// TODO : DataBase connection function
DataBaseCon();

// TODO : express body parse
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// TODO : using CookieParser
app.use(cookieParser());

// !----------------------------------------------------

// TODO : index routes file is placed here
app.use("/api/v1/", indexRoutes);

// TODO for response error
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});

app.listen(process.env.PORT || 8000, () => {
  console.log("server is running on port " + process.env.PORT || 8000);
});
