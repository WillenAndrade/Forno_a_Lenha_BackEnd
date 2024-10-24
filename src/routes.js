const express = require("express");
const FeedBack = require("./models/FeedBack");
const routes = express.Router();

const validCredentials = {
    username: 'usuario', 
    password: 'senha' 
};

routes.post('/login', (req, res) => {
    const { username, pass } = req.body;

    if (username === validCredentials.username && pass === validCredentials.password) {
        
        req.session.user = username;
        
        res.json({
            status: true,
            message: "Login feito com sucesso...",
        });
    } else {
        res.status(401).json({ message: 'Usuário ou senha inválidos!' });
    }
});

const checkAuth = (req, res, next) => {
    if (req.session.user) {
        next(); 
    } else {
        res.status(403).send('Acesso negado! Faça login para acessar os feedbacks.');
    }
};


routes.get("/feedback",  async (req, res) => {
    try {
        const FeedBackData = await FeedBack.findAll();
        return res.json({
            status: true,
            message: FeedBackData
        });
    } catch (error) {
        console.log(error);
        res.json({
            error: true,
            message: "Error retrieving data...",
        });
    }
});

routes.post("/feedback",  async (req, res) => {
    try {
        const FeedBackData = await FeedBack.create(req.body);
        res.status(201).json({
            error: false,
            message: "Feedback sent successfully!",
            data: FeedBackData
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: "Error sending feedback.",
        });
    }
});


routes.delete("/feedback/:id",  async (req, res) => {
    try {
        const { id } = req.params;
        await FeedBack.destroy({ where: { id } });
        return res.json({
            status: true,
            message: 'Feedback deleted with success!'
        });
    } catch (error) {
        return res.json({
            status: false,
            message: error?.message ?? 'Error on delete feedback!'
        });
    }
});

module.exports = routes;
