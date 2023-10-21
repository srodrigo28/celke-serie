const jwt = require('jsonwebtoken')
const { promisify } = require('util')
require('dotenv').config();

module.exports = {

    eAdmin: async function (req, res, next) {
        const chave = process.env.SECRET;

        // return res.json({ mensagem: "validar token" })
        const authHeader = req.headers.authorization;
    
        if(authHeader === undefined){
            return res.status(400).json({
                erro: true,
                msn: "Erro: 1. Certificado de segurança não existente contate o suporte! "
            });
        }
    
        const [bearer, token] = authHeader.split(' ');
    
        if(!token){
            return res.status(400).json({
                erro: true,
                msn: "Erro: 2. Certificado de segurança não existente contate o suporte! "
            });
        }
        
        try{
            const decoded = await promisify(jwt.verify)(token, chave);
            req.userId = decoded.id;
            req.levelAcess = decoded.levelAcess;
    
            return next();
        }catch(err){
            return res.status(400).json({
                erro: true,
                msn: err + "Erro: 3. Certificado de segurança corrompido contate o suporte! "
            });
        }
    }
};