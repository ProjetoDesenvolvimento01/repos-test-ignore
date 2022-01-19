const express = require('express');
const router = express.Router()
const Users = require("../Database/query")
const bcrypt = require('bcrypt')

router.get('/user/cadastro', (req, res) =>{
    res.render("users/cadastrar")
})

router.get('/login', (req, res) => {
    res.render("users/login")
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
            res.json({erro: "Já existe um cliente cadastrado com esses dados"})
        }
    })
    
})

router.post('/logar', (req, res)=>{
    var {email, password} = req.body
    //SELECT * FROM users WHERE email="email informado no input" AND senha = "senha informada no input"
    if(email != '' && password != ''){
        Users.findOne({where:{email: email}}).then(resultado => {
            if(resultado != undefined){
                var correct = bcrypt.compareSync(password, resultado.senha)
                var user = resultado.nome
                if(correct){
                    res.send("Credenciais corretas")
                }else{
                    res.send("Credenciais invalidas")
                }
            }else{
                res.send("Erro nas credenciais do usuário!")
            }
        })
    }else{
        res.render('users/login')
    }
})

// router.get('/usuarios', (req, res) => {
//     Users.findAll().then(Usuarios=>{
//         res.json(Usuarios)
//     })
//
//      Select * FROM users WHERE id = 1
//     Users.findOne({where:{id:1}}).then(Usuarios=>{
//         res.json(Usuarios)
//     })
//      
//      Select pelo ID 
//     Users.findByPk(1).then(Usuarios=>{
//         res.json(Usuarios)
//     })
// })

module.exports = router;