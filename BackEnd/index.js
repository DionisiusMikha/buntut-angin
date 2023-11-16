require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./src/routes/index");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    cors({
      origin: "http://localhost:5173",
      optionsSuccessStatus: 200,
    })
);

app.use("/assets", express.static("assets"));
app.use("/api", router);

const port = process.env.PORT;
app.listen(port, function(){
    console.clear();
    console.log(`Listening to Port ${port}`);
});

//npx sequelize-cli db:create
//npx sequelize-cli db:migrate