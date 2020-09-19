exports.up = function(knex) {
    return knex.schema.createTable('entregador', function(table) {
        table.string('idEntregador').primary();
        table.string('nome').notNull();
        table.string('sobrenome').notNull();
        table.string('telefone').notNull();
        table.string('login').notNull();
        table.string('senha').notNull();
    });
};
exports.down = function(knex) {
    return knex.schema.dropTable('entregador');
};