const Sequelize = require('sequelize');

const sequelize = new Sequelize.Sequelize( 'celke', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
.then( function() {
    console.log("Sucesso com o Sequelize")
}).catch(function(){
    console.log("Erro: com o Sequelize")
});

module.exports = sequelize;
