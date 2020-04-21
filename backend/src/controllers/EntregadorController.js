const connection = require('../database/connection');
const generateUniqueId = require('../../src/utils/generateUniqueId')

module.exports = {
    async index(req, res) {
        const entregador = await connection('entregador')
        .select('idEntregador', 'nome', 'sobrenome', 'telefone');
        return res.json(entregador);
    },

    async create(req, res) {
        const {nome, sobrenome, telefone, login, senha} = req.body;

        const idEntregador = generateUniqueId();

    await connection('entregador').insert({
        idEntregador,
        nome,
        sobrenome,
        telefone,
        login,
        senha,
    })

    return res.json({idEntregador})
    }

};