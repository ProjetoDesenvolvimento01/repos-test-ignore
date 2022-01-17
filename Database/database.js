const Sequelize = require('sequelize');

const connection = new Sequelize("d9qcl6r81alqfk", "icsbhmraspreaa", "5a00c60bca00671cb1c98e9a1e8b035ef8bf4f4d23a989ed06e2109c8cfc8bad", {
    host: 'ec2-34-230-198-12.compute-1.amazonaws.com',
    dialect: 'postgres',
    timezone: "-03:00",
    logging: true,
    dialectOptions:{
        ssl: {
            require: false,
            rejectUnauthorized: false // <<< I need this
        }
    }
})

module.exports = connection;