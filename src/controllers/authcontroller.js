const express = require('express');
const User = require('../models/user');
const router = express()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}
router.post('/register', async (req, res) =>{
    const {email} = req.body
    try {
        if(await User.findOne({email}))
            return res.status(400).send({error: 'Usuario já existente'});
        const user = await User.create(req.body);
        user.password = undefined;
        return res.send({
            user, token: generateToken({id: user.id}),
        });
    } catch (err) {
        console.log(err)
        return res.status(400).send({error: 'Registro invalido!!!'})
    }
});

router.post('/authenticate', async(req,res) =>{
    const {email,password} = req.body;
    const user = await User.findOne({email}).select('+password');
    if(!user){
        return res.status(400).send({ error: 'Usuario não encontrado'});
    }
    if(await bcrypt.compare(password, user.password)){
        return res.status(400).send({error: "Senha Invalida"});
    }
    user.password = undefined;

    const token = jwt.sign({id: user.id}, authConfig.secret,{
        expiresIn: 86400,
    })
    res.send({user, token});
});


module.exports = app => app.use('/auth', router);