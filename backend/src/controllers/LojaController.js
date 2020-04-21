const connection = require('../database/connection');
const generateUniqueId = require('../../src/utils/generateUniqueId')

module.exports = {
    async index(req, res) {
        const loja = await connection('loja')
        .select('idLoja', 'nomeFantasia', 'telefone', 'email');
        return res.json(loja);
    },

    async create(req, res) {
        const {nomeFantasia, telefone, email, login, senha} = req.body;

        const idLoja = generateUniqueId();

    await connection('loja').insert({
        idLoja,
        nomeFantasia,
        telefone,
        email,
        login,
        senha,
    })

    return res.json({idLoja})
    }

};