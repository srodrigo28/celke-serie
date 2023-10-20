const { promiify } = require('util');

const express = require("express");

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
// 4. Agora validar token
app.get("/users/:id", validarToken, async (req, res) => {
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

// 5. Cadastro com Criptografia de senha
app.post("/user", async (req, res) => {
    var dados = req.body;
    dados.password = await bcrypt.hash(dados.password, 8);

    await Usuario.create( dados )
        .then(() => {
            return res.status(201).json({
                erro: false,
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

// 6. Atualizando cadastro com criptografia
app.put("/user-senha", async (req, res) => {
    const { id, password } = req.body;

    var senhaCrypt = await bcrypt.hash(password, 8);

    await Usuario.update({password: senhaCrypt}, {where: {id}} )
    .then(() => {
        return res.json({
            erro: true,
            msn: "Sucesso:: editado 2"
        })
    }).catch(() => {
        return res.json({
            erro: true,
            msn: "Erro: Usuário não editado"
        })
    })
});

// 6. Atualizando cadastro
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

// 7. Apagando
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
        return res.status(400).json({
            erro: true,
            msn: "Error não deletado"
        });
    })
});

// 8. Login
app.post('/login', async (req, res) => {
    const user = await Usuario.findOne({
        attributes: ['id', 'name', 'email', 'password' ],
        where: {email: req.body.email }})

    if(user === null){
        return res.status(400).json({
            erro: true,
            msn: "Error Usuário não encontrado"
        });
    }else if(!(await bcrypt.compare(req.body.password, user.password))){
        return res.status(400).json({
            erro: true,
            msn: "Senha do Usuário divergente!"
        });
    }

    /** Criando uma sessão via jwt */
    const chaveToken = 'yFSJrVue3K4';

    var token = jwt.sign({id: user.id}, chaveToken, {
        //expiresIn: 600 // 10min
        expiresIn: '7d' // 7 dias
    });

    return res.json({
        erro: true,
        msn: "Login realizado com sucesso",
        token: token
    })
})

// 9. Validar Token
async function validarToken(req, res, next){
    // return res.json({ mensagem: "validar token" })
    const authHeader = req.headers.authorization;
    const [bearer, token] = authHeader.split(' ');

    if(!token){
        return res.status(400).json({
            erro: true,
            msn: " Erro: Certificado de segurança não existente contate o suporte! "
        });
    }
    try{
        const decode = await promiify(jwt.verify(token, 'chaveToken'));
        req.userId = decode.id;
        return next();

    }catch(err){
        return res.status(400).json({
            erro: true,
            msn: err + " Erro: Certificado de segurança inválido contate o suporte! "
        });
    }

   return res.json( { mensagem: token } )
   // return res.json( { mensagem: `validar token: ${token}` } )
   // return res.json( { mensagem: "validar token: " + token} )
    
    return next();
}

let port = 8080;

app.listen(port, () => {
    console.log("Success API Online!")
});