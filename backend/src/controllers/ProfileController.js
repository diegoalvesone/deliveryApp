const connection = require('../database/connection');


module.exports = {
    async index(req, res) {
        const loja_id = req.headers.authorization;
        const entregas = await connection('entrega')
        .join('entregador', 'entregador.idEntregador', '=', 'entrega.entregador_id')
        .where('entrega.loja_id', loja_id)
        .select(['entrega.*', 'entregador.nome']);


        return res.json(entregas);
    }
}