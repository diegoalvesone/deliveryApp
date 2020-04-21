const connection = require('../database/connection');


module.exports = {
    async index(req, res) {

        const {page = 1} = req.query;

        const [count] = await connection('entrega').count();

        const entrega = await connection('entrega')
        .join('loja', 'loja.idLoja', '=', 'entrega.loja_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select(['entrega.*']);

        res.header('X-Total-Count', count['count(*)']);

        return res.json(entrega);
    },

    async create(req, res) {
        const {endereco, valorReceber, troco, frete, entregador_id} = req.body;
        const loja_id = req.headers.authorization;

        process.env.TZ = 'America/Sao Paulo';
        const data = new Date().toLocaleString("pt-BR", {
            timeZone: "America/Sao_Paulo"
        });


        console.log(data,process.env.TZ);

        const [id] = await connection('entrega').insert({
            endereco,
            valorReceber,
            troco,
            frete,
            data,
            entregador_id,
            loja_id,
        });
        return res.json({ id });
    },

    async delete(req, res) {
        const { idEntrega } = req.params;
        const loja_id = req.headers.authorization;

        const entrega = await connection('entrega')
            .where('idEntrega' ,idEntrega)
            .select('loja_id')
            .first();

        if (entrega.loja_id !== loja_id) {
            return res.status(401).json({error: 'Operation not permitted.'});
        }
        await connection('entrega').where('idEntrega', idEntrega).delete();

        return res.status(204).send();
    }

};