const express = require('express');
const router = express.Router()
const Users = require("../Database/query")
const bcrypt = require('bcrypt')
const multer = require('multer');
const path = require('path');
const fs = require('fs')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/uploads/")
    },
    filename: function(req, file, cb){
        cb(null, file.originalname + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({ storage })

router.get('/user/cadastro', (req, res) =>{
    res.render("users/cadastrar")
})

router.get('/login', (req, res) => {
    res.render("users/login")
})

router.get('/upload', (req, res) => {
    var user = req.session.resultado.id
    if(user != undefined){
        Users.findByPk(user).then(resultado => {
            res.render("parciais/upload.ejs", {image: resultado.image})
        })
    }else{
        res.redirect('/login')
    }
})

router.post('/upload', upload.single('img'), async (req, res) => {
    var img = req.file.filename
    var usuario = req.session.resultado
    console.log(usuario)
    if(usuario != undefined){
        try{
            var client = await Users.findByPk(usuario.id)
            console.log(client)
            var x = await fs.unlinkSync(`public/uploads/${client.image}`)
            console.log(x)
            if(client != undefined){
                Users.update({image: img}, {where:{nome: usuario.nome}}).then(function(rowsUpdated){
                    res.redirect('/upload')
                }).catch(err =>{
                    console.log(err)
                })
            }
        }catch(e){
            res.json({error: e})
        }
    }
})


router.post('/cadastro', (req, res)=>{
    var {nome,email,password} = req.body
    
    Users.findOne({where:{email: email}}).then(resultado => {
        if(resultado == undefined){
            var salt = bcrypt.genSaltSync(10)
            var hash = bcrypt.hashSync(password, salt)
                Users.create({
                    nome: nome,
                    email: email,
                    senha: hash
                }).then(dado=>{
                    res.send(dado)
                })
        }else{
            res.redirect('/login')
        }
    })
    
})

router.get('/authentic', (req, res) => {
    var user = req.session.resultado.id
    if(user != undefined){
        Users.findByPk(user).then(resultado => {
            res.render('users/authentic', {nome: resultado.nome, image: resultado.image})
        })
    }else{
        res.redirect('/login')
    }
})

router.post('/logar', (req, res)=>{
    var {email, password, checkout} = req.body
    //SELECT * FROM users WHERE email="email informado no input" AND senha = "senha informada no input"
    if(email != '' && password != ''){
        Users.findOne({where:{email: email}}).then(resultado => {
            if(resultado != undefined){
                var correct = bcrypt.compareSync(password, resultado.senha)
                var user = resultado.nome
                if(correct){
                    req.session.resultado = {
                        id: resultado.id,
                        nome: user
                    }
                    res.redirect('/authentic')
                }else{
                    res.send("Credenciais invalidas")
                }
            }else{
                res.send("Erro nas credenciais do usuário!")
            }
        })
    }else{
        res.redirect('/login')
    }
})

router.get("/logout", (req, res) => {
    req.session.resultado = undefined;
    res.redirect('/')
})

module.exports = router;