const connection = require('../database/connection');

module.exports = {

    async create(req, res) {
        const {login, senha} = req.body;

        const loja = await connection('loja')
        .where({
            'login': login,
            'senha': senha
        })
        .select('idLoja','nomeFantasia')
        .first();

        if(!loja) {
            return res.status(400).json({error: 'Nenhuma loja encontrada com esse Login ou a senha está incorreta!'});
        }

        return res.json(loja);
    }

}