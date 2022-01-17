const express = require('express')
const app = express();

const connection = require("./Database/database")
const PORT = process.env.PORT || 8080;
const path = require('path')

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

app.use('/', clientController);

app.get('/', (req, res) => {
    res.render("index");
})

app.listen(PORT, () => {
    console.log("===========> Servidor ligado! <===========")
})