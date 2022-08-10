require("dotenv").config()
const express = require("express");
const app = express();
const db = require("./config/mongoose");

app.use(express.urlencoded());

app.set("view engine", "ejs");

app.set("views", "views");
console.log(process.env.SECRET_KEY);
app.use("/", require("./routes/"));
app.listen(8001, () => {
    console.log(`http://localhost:8001`);
})