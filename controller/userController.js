const express = require('express');
const router = express.Router()
const Users = require("../Database/query")

router.get('/user/cadastro', (req, res) =>{
    res.render("users/cadastrar")
})

router.get('/login', (req, res) => {
    res.render("users/login")
})

router.post('/cadastro', (req, res)=>{
    var {nome,email,password} = req.body
        Users.create({
            nome: nome,
            email: email,
            senha: password
        }).then(dado=>{
            res.json({dado:dado})
        })
})

router.post('/logar', (req, res)=>{
    var {email, password} = req.body
    //SELECT * FROM users WHERE email="email informado no input" AND senha = "senha informada no input"
    if(email != '' && password != ''){
        Users.findOne({where:{email: email, senha: password}}).then(resultado => {
            if(resultado != undefined){
                res.render("users/authentic", {nome: resultado.nome})
            }else{
                res.send("Erro nas credenciais do usuário!")
            }
        })
    }else{
        res.send("Campos de usuários não podem estar vazios.")
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