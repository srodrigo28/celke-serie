require('dotenv').config();

const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');

const db = require('./models/db');
const Usuario = require('./models/Usuario.js');
const { eAdmin } = require('./middlewares/auth.js')

const app = express();

app.use(express.json());

app.use(cors())

/*** 2
app.use(cors({
    origin: '*'
}));
 */

/*** 3
app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});
*/

/*** 4 Config persolinalizada para CORS
app.use((_, res, next) => {
    try{
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
        app.use(cors());
        next();
    }catch(erro){
        return res.status(400).json({
            erro: true,
            msn: 'Erro: 00:: Cors !'
        })
    }
})
*/

const chave = process.env.SECRET;

// 1. 
app.get("/users", eAdmin, async (req, res) => {
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
app.get("/users/order", eAdmin, async (req, res) => {
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
app.get("/users/details", eAdmin, async (req, res) => {
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
app.get("/users/:id", eAdmin, async (req, res) => {
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
app.post("/user", eAdmin, async (req, res) => {
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
app.put("/user-senha", eAdmin, async (req, res) => {
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
// 7. Atualizando cadastro
app.put("/user", eAdmin, async (req, res) => {
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
// 8. Apagando
app.delete("/user/:id", eAdmin, async (req, res) => {
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
// 9. Login e Nivel de acesso
app.post('/login', async (req, res) => {

    await sleep(2000);

    function sleep(ms){
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        })
    }

    const user = await Usuario.findOne({
        attributes: ['id', 'name', 'email', 'password' ],
        where: {
            email: req.body.email 
        }
    })

    if(user === null){
        return res.status(400).json({
            erro: true,
            msn: "Error Usuário não encontrado"
        });
    }

    if(!(await bcrypt.compare(req.body.password, user.password))){
        return res.status(400).json({
            erro: true,
            msn: "Senha do Usuário divergente!"
        });
    }

    /** Criando uma sessão via jwt */

    var token = jwt.sign({ id: user.id, levelAcess: 1 }, chave, {
        //expiresIn: 600 // 10min
        expiresIn: '7d' // 7 dias
    });

    return res.json({
        erro: true,
        msn: "Login realizado com sucesso",
        token: token
    })
})
// 10. Validar
app.get("/val-token", eAdmin, async (req, res) => {
    await Usuario.findByPk(req.userId, { attributes: ['id', 'name', 'email'] })
    .then( (Usuario) => {
        return res.json({
            // erro: false,
            Usuario,
            nivel: req.levelAcess
            //nivelAcesso: req.levelAcess
            // msn: "Token válido! Usuario: " + req.userId + " Nivel de acesso: " +  req.levelAcess
        });
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            msn: "Error val-token: token inválido!"
        });
    })
});

let port = 8080;

app.listen(port, () => {
    console.log("Success API Online!")
});