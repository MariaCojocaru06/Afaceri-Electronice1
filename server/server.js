// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config()
//   }
const express = require("express");
const cors = require("cors");
const port = 8083;
// const bcrypt = require("bcrypt")
const sequelize = require("./sequelize")
const Users = require("./models/users")
const Product = require("./models/product");
const Order = require("./models/order");
Order.belongsTo(Users);
Order.hasMany(Product);
Users.hasMany(Order)
Product.belongsToMany(Order, { through: "Product-Order" })


//pornire server
const app = express()
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());
app.use(cors())

//USER- autentificare + register
app.use("/user",require("./routes/users"))
app.use("/prod",require("./routes/product"))
//PRODUCT
app.get('/', (req, res) => {
    res.send('Welcome to my app');
});

app.
    listen(port, () => {
        console.log('Running on port ' + port);
    });
//Functie pentru sincronizarea  bazei de date
//1. in post cream baza de date ->localhost:3000/ put
app.put("/", async (request, response, next) => {
    try {
        await sequelize.sync({ force: true });
        response.sendStatus(204);
    } catch (error) {
        next(error);
    }
});



