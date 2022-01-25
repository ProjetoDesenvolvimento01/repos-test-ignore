const Sequelize = require('sequelize')
const connection = require('./database')

const adm = connection.define('adm',{
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    foto: {
        type: Sequelize.STRING,
    }
})

//adm.sync({force: true}).then(()=>{console.log("Tabela ADM criada com sucesso!")})

module.exports = adm;