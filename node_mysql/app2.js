const express = require("express");
const db = require('./models/db');

const Usuario = require('./models/Usuario.js');

const app = express();

app.use(express.json());

// 1. 
app.get("/users", async (req, res) => {
    await Usuario.findAll()
    .then( (users) => {
        return res.json({
            erro: false,
            users: users
        });
    }) .catch( () => {
        return res.status(400).json({
            erro: true,
            msn: 'Sem registros :( !'
        })
    })
});
// 2. 
app.get("/users/order", async (req, res) => {
    await Usuario.findAll({order: [['id', 'DESC']]})
    .then( (users) => {
        return res.json({
            erro: false,
            users: users
        });
    }) .catch( () => {
        return res.status(400).json({
            erro: true,
            msn: 'Sem registros :( !'
        })
    })
});
// 3. 
app.get("/users/details", async (req, res) => {
    await Usuario.findAll({
    attributes: ['id', 'name', 'email'],
    order: [['name', 'ASC']] })
    .then( (users) => {
        return res.json({
            erro: false,
            users
        });
    }) .catch( () => {
        return res.status(400).json({
            erro: true,
            msn: 'Sem registros :( !'
        })
    })
});
// 4. 
app.get("/users/:id", async (req, res) => {
    const { id } = req.params;

    // await Usuario.findAll( { where: { id: id }})
    await Usuario.findByPk(id)
    .then( (users) => {
        return res.json({
            erro: false,
            users: users
        });
    }).catch( () => {
        return res.status(400).json({
            erro: true,
            msn: 'Sem registros :( !'
        })
    })
});
// 5. 
app.post("/user", async (req, res) => {
    const { name, email } = req.body;
    await Usuario.create( req.body )
        .then(() => {
            return res.status(201).json({
                erro: false,
                name: name,
                email: email,
                msn: 'Usuário cadastrado com suceso'
            });
        })
        .catch(() => {
            return res.status(400).json({
            erro: true,
            msn: 'Usuário cadastrado com suceso'
        });
    });
});
// 6. 
app.put("/user", async (req, res) => {
    const { id } = req.body;

    await Usuario.update( req.body, {where: {id}} )
    .then(() => {
        return res.json({
            erro: true,
            msn: "Sucesso:: editado"
        })
    }).catch(() => {
        return res.json({
            erro: true,
            msn: "Erro: Usuário não editado"
        })
    })
});
// 7. 
app.delete("/user/:id", async (req, res) => {
    const { id } = req.params;

    await Usuario.destroy({ where: {id}})
// const id = req.params.id;
    .then( () => {
        return res.json({
            erro: false,
            msn: "Excluido sucesso"
        });
    }).catch(() => {
        return res.json({
            erro: true,
            msn: "Error não deletado"
        });
    })
});

let port = 8080;

app.listen(port, () => {
    console.log("Success API Online!")
});