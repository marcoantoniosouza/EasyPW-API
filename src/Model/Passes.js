const conn = require('../conn');

const Model = conn.model('Password', {
    nome: String,
    pass: String,
    owner: String
});

class Pass{
    async index(request, response){
        const authHeader = request.get('auth');
        if (authHeader) {
            const passes = await Model.find({owner: authHeader});
            return response.json(passes);
        } else {
            response.status(403);
            return response.send();
        }
        
    }

    async create(request, response){
        const authHeader = request.get('auth');
        if (authHeader) {
            try {
                const reqBody = request.body;
                reqBody["owner"] = authHeader;
                await Model.create(reqBody);
                return response.json({status: "OK!"});
            } catch (error) {
                response.status(400);
                return response.json({message: 'Erro Inesperado'});
            }
        } else {
            response.status(403);
            return response.send();
        }   
    }

    async update(request, response){
        const authHeader = request.get('auth');
        if (authHeader) {
            try {
                const oldPass = await Model.findById(request.body._id);
                
                oldPass.nome = request.body.nome;
                oldPass.pass = request.body.pass;

                oldPass.save();

                return response.json({status: "OK!"});
            } catch (error) {
                response.status(400);
                return response.json({message: 'Erro Inesperado'});
            }
        } else {
            response.status(403);
            return response.send();
        }   
    }
};

module.exports = Pass;