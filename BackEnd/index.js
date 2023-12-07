require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./src/routes/index");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const corsOptions = {
    origin: "http://localhost:5173",
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));


app.use("/assets", express.static("assets"));
app.use("/api", router);

const port = process.env.PORT;
app.listen(port, function(){
    console.clear(); 
    console.log(`Listening to Port ${port}`);
});

// npx sequelize-cli model:generate --name User --attributes display_name:string,email:string,username:string,password:string,birthdate:date,saldo:integer,api_hit:integer,profile_picture:string
// npx sequelize-cli model:generate --name Doctor --attributes display_name:string,email:string,username:string,password:string,phone_number:string,birthdate:date,address:string,profile_picture:string

// npx sequelize-cli seed:generate --name User
// npx sequelize-cli db:create
// npx sequelize-cli db:migrate
