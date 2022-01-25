const Sequelize = require('sequelize')
const connection = require('./database')

const Users = connection.define('users',{
  nome: {
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
  image:{
    type: Sequelize.STRING
  }
})


//Users.sync({force:true}).then(()=>console.log("Tabela criada com sucesso!")) // <- Utilize isso para criar o banco de dados. Após criar a primeira vez, comente.



module.exports = Users