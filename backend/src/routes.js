const express = require('express');
const EntregadorController = require('./controllers/EntregadorController');
const LojaController = require('./controllers/LojaController');
const EntregaController = require('./controllers/EntregaController');
const SessionLojaController = require('./controllers/SessionLojaController');
const ProfileController = require('./controllers/ProfileController');
const {celebrate, Segments, Joi} = require('celebrate');




const routes = express.Router();

routes.get('/entregador' ,EntregadorController.index);
routes.post('/entregador', celebrate({
    [Segments.BODY]: Joi.object().keys({
        nome: Joi.string().required(),
        sobrenome: Joi.required(),
        telefone: Joi.string().required().length(11),
        login: Joi.string().required(),
        senha: Joi.string().required(),
    })
}) ,EntregadorController.create);

routes.get('/loja' ,LojaController.index);
routes.post('/loja',LojaController.create);

routes.get('/entrega' ,celebrate( {
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}) ,EntregaController.index);
routes.post('/entrega' ,EntregaController.create);
routes.delete('/entrega/:idEntrega',celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        idEntrega: Joi.number().required(),
    })
}) ,EntregaController.delete);

routes.post('/sessions' ,SessionLojaController.create);

routes.get('/profile' , celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}) ,ProfileController.index);


module.exports = routes;