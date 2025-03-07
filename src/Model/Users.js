const conn = require('../conn');
const crypto = require('crypto');

const Model = conn.model('User', {
    nome: String,
    user: {type: String, unique: true},
    pass: String,
    authHash: String
});

class User{
    async index(request, response){
        const r = await Model.find({});
        return response.json(r);
    }

    async create(request, response){
        let hash = crypto.createHash('sha256');
        let hashAuth = crypto.createHash('sha256');

        const reqBody = request.body;
        const pass = hash.update(reqBody.pass).digest('hex');
        const authHash = hashAuth.update(reqBody.user + pass + 'PaulaPass@)@)').digest('hex');
        const userJson = {
            nome: reqBody.nome,
            user: reqBody.user,
            pass: pass,
            authHash: authHash,
        };
        try {
            await Model.create(userJson);
            return response.json({status: "OK!"});
        } catch (error) {
            response.status(400);
            return response.json({message: 'Usuário indisponível'});
        }
        
        
    }

    async login(request, response){
        let hash = crypto.createHash('sha256');
        let hashAuth = crypto.createHash('sha256');

        const pass = hash.update(request.body.pass).digest('hex');
        const user = await Model.findOne({ user: request.body.user, pass: pass});
        if (user) {
            return response.json({authHash : user.authHash});
        } else {
            response.status(401);
            return response.send();
        }
        
    }
};

module.exports = User;