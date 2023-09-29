const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    return res.json({
        erro: false,
        nome: "Sebastião",
        email: "srodrigo@gmail.com"
    });
});

app.get("/usuario/:id", (req, res) => {
    const { id } = req.params;
    return res.json({
        erro: false,
        id: id,
        nome: "Sebastião",
        email: "srodrigo@gmail.com"
    });
});

app.post("/usuario", (req, res) => {
    const { nome, email } = req.body;

    return res.json({
        erro: false,
        nome: nome,
        email: email,
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