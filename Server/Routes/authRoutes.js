const express = require("express")
const AuthControler = require("../Controller/AuthController")
const routes = express.Router();
const { check } = require("express-validator");
const auth = require("../Middleware/auth");


routes.post("/register",
    [
        check("email", "El email es requerido").isEmail(),
        check(
            "password",
            "La Password es requerida con al menos 5 caracteres"
        ).isLength({ min: 5 }),
    ]
    , AuthControler.registerUser)



routes.post("/login", [
    check("email", "El email es requerido").isEmail(),
    check(
        "password",
        "La Password es requerida con al menos 6 caracteres"
    ).isLength({ min: 6 }),
],
    AuthControler.loginUser)




routes.get("/users", auth, AuthControler.getListUsers)




module.exports = routes