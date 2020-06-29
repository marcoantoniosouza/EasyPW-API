const conn = require('../conn');

const Model = conn.model('User', {
    nome: String,
    user: String,
    pass: String
});

class User{
    async index(request, response){
        const r = await Model.find({});
        return response.json(r);
    }

    async create(request, response){
        await Model.create(request.body);
        return response.json({Status: "OK!"});
    }
};

module.exports = User;