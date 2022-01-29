const { validationResult } = require("express-validator");
const User = require("../Model/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {

    const errors = validationResult(req);
    //View Error of Body
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: true, data: errors.array() });
    }

    try {

        req.body.email = req.body.email.toLowerCase();

        //View Emails Duplicates
        const findUser = await User.findOne({ email: req.body.email });
        if (findUser) return res.status(400).json({ error: true, data: "Ya Existe un usuario con este email" });

        //Create User
        const user = new User(req.body);

        //Hash Password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);

        //Save User
        let userCreate = await user.save();
        if (!userCreate) return res.status(400).json({ error: true, data: "Error al crear el usuario" });


        //Generate Token
        jwt.sign(
            { ...userCreate._doc, password: "encrypted" },
            process.env.PALABRA_SECRETA,
            { expiresIn: "2h" },
            (error, token) => {
                if (error) throw error;
                return res.status(200).json({ error: false, data: { token, ...jwt.verify(token, process.env.PALABRA_SECRETA) }, });
            }
        );




    } catch (error) {
        console.log(error);
        res.status(400).json({ error: true, data: "Error al registrar un usuario" });
    }

}

exports.loginUser = async (req, res) => {

    const errors = validationResult(req);

    //View Error of Body
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: true, data: errors.array() });
    }

    try {

        req.body.email = req.body.email.toLowerCase();

        //View Emails
        const findUser = await User.findOne({ email: req.body.email });
        if (!findUser) return res.status(400).json({ error: true, data: "Credenciales Invalidas" });

        //View equals password
        if (!bcrypt.compareSync(req.body.password, findUser.password)) return res.status(400).json({ error: true, data: "Contrasena invalidad" });


        //Generate Token
        jwt.sign(
            { ...findUser._doc, password: "encrypted" },
            process.env.PALABRA_SECRETA,
            { expiresIn: "2h" },
            (error, token) => {
                if (error) throw error;
                return res.status(200).json({ error: false, data: { token, ...jwt.verify(token, process.env.PALABRA_SECRETA) }, });
            }
        );
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: false, data: "Error al buscar el usuario" });
    }



}


exports.getListUsers = async (req, res) => {


    try {

        let users = await User.find()
        return res.status(200).json({ error: false, data: users })

    } catch (error) {

        console.log(error);
        res.status(400).json({ error: false, data: "Error al traer la lista de usuarios" });

    }




}