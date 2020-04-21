const connection = require('../database/connection');


module.exports = {
    async index(req, res) {
        const loja_id = req.headers.authorization;

        const entregas = await connection('entrega')
        .where('loja_id', loja_id)
        .select('*');

        return res.json(entregas);
    }
}