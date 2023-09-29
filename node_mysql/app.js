const express = require("express");

const app = express();

app.get("/", (req, res) => {
    return res.json({
        erro: false,
        nome: "Sebastião",
        email: "srodrigo@gmail.com"
    });
});

let port = 8080;

app.listen(port, () => {
    console.log("Success API Online!")
});