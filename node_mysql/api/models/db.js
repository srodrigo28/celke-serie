const Sequelize = require('sequelize');


const sequelize = new Sequelize.Sequelize( process.env.DB, process.env.USER, process.env.PASS, {
    host: process.env.HOST,
    dialect: process.env.DIALECT
});

sequelize.authenticate()
.then( function() {
    console.log("Sucesso com o Sequelize")
}).catch(function(){
    console.log("Erro: com o Sequelize")
});

module.exports = sequelize;
