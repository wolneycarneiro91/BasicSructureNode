const { user: userModel } = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userController = {
    create: async (req, res) => {
        const { name, description, password, confirmpassword, email } = req.body;
        if (!name) {
            return res.status(422).json({ msg: "O nome é obrigatório" });
        }
        if (password !== confirmpassword) {
            return res.status(422).json({ msg: "As senhas não são idênticas" });
        }
        const userExists = await userModel.findOne({ email: email });
        if (userExists) {
            return res.status(422).json({ msg: "Esse usuário já existe" });
        }
        try {
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);
            const user = {
                name,
                email,
                description,
                password: passwordHash,
                confirmpassword: passwordHash
            }
            const response = await userModel.create(user);
            res.status(201).json({ response, msg: "Serviço criado com sucesso" });
        } catch (error) {
            console.log(error);
        }
    },
    getAll: async (req, res) => {
        try {
            const user = await userModel.find();
            res.status(200).json(user);
        } catch (error) {
            console.log(error);
        }
    },
    get: async (req, res) => {
        try {
            const id = req.params.id;
            const user = await userModel.findById(id);
            if (!user) {
                res.status(404).json({ msg: "Serviço não encontrado" });
            }
            res.status(200).json(user);
        } catch (error) {
            console.log(error);
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const deleteduser = await userModel.findByIdAndDelete(id);
            if (!deleteduser) {
                res.status(404).json({ msg: "Serviço não encontrado" });
            }
            res.status(200).json({ deleteduser, msg: "Serviço excluido com sucesso" });
        } catch (error) {
            console.log(error);
        }
    },
    update: async (req, res) => {
        const { name, description, password, confirmpassword, email } = req.body;
        if (!name) {
            return res.status(422).json({ msg: "O nome é obrigatório" });
        }
        if (password !== confirmpassword) {
            return res.status(422).json({ msg: "As senhas não são idênticas" });
        }
        const userExists = await userModel.findOne({ email: email });
        if (!userExists) {
            return res.status(422).json({ msg: "O e-mail não pode ser alterado por aqui" });
        }
        try {
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);
            const user = {
                name,
                email,
                description,
                password: passwordHash,
                confirmpassword: passwordHash
            }
            const response = await userModel.findByIdAndUpdate(id, user);
            res.status(200).json({ user, msg: "Serviço atualizado com sucesso" });
        } catch (error) {
            console.log(error);
        }
    },
    login: async (req, res) => {
        const { password, email } = req.body;
        const user = await userModel.findOne({ email: email });
        const secret = process.env.SECRET;
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!user || !checkPassword) {
            return res.status(404).json({ msg: "Credenciais inválidas" });
        }
        try {
            const token = jwt.sign({
                id: user._id
            }, secret);
            return res.status(200).json({ msg: "Autenticado", token: token });

        } catch (error) {
            console.log(error);
        }
    },
     checkToken:(req, res, next)=>{
        const authHeader =req.headers['authorization'];
        const token = authHeader && authHeader.split(" ")[1];
        if(!token){
            return res.status(401).json({ msg: "Acesso negado" });
        }
        try{
            const secret = process.env.SECRET;
            jwt.verify(token, secret);
            next();
        }catch(error){
            return res.status(400).json({ msg: "Token inválido" });
        }

    }
};

module.exports = userController;