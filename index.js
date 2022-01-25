require('dotenv').config()
const express = require('express')
const app = express();

const bodyparser = require("body-parser")
const User = require('./Database/query') //Realiza a criação da tabela usuários
const adm = require('./Database/adm') //Realiza a criação da tabela adm
const connection = require("./Database/database")
const PORT = process.env.PORT || 8080;
const path = require('path')
const session = require('express-session')

const clientController = require('./controller/userController')

connection.authenticate().then(()=>{
    console.log("Conexão feita com sucesso!");
})
.catch((msgErro) => {
    console.log(msgErro);
})

const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

pool.connect();

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//Usando o Express-session
app.use(session({
    secret: "açlsdkfjçadlsfjalçfkj",
    cookie: { maxAge: 300000 }
}))

app.use(express.static('public'));
app.use('/uploads', express.static(__dirname + 'public/uploads'))

app.use(bodyparser.urlencoded())
app.use(bodyparser.json())

app.use('/', clientController);

app.get('/', (req, res) => {
    res.render("index");
})

app.get('/:slug', (req, res) =>{
    res.redirect('/')
})

app.listen(PORT, () => {
    console.log("===========> Servidor ligado! <===========")
})