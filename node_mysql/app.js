const express = require("express");
const db = require('./models/db');

const Usuario = require('./models/Usuario.js');

const app = express();

app.use(express.json());

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

app.get("/users/:id", async (req, res) => {
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

app.put("/usuario", (req, res) => {
    const { id, nome, email } = req.body;

    return res.json({
        erro: false,
        id: id,
        nome: nome,
        email: email,
        message: "atualizado com sucesso"
    });
});

app.delete("/usuario/:id", (req, res) => {
    const { id } = req.params;
// const id = req.params.id;
    return res.json({
        erro: false,
        id: id,
        message: "Excluido sucesso"
    });
});

let port = 8080;

app.listen(port, () => {
    console.log("Success API Online!")
});