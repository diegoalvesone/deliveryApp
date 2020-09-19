exports.up = function(knex) {
    return knex.schema.createTable('loja', function(table) {
        table.string('idLoja').primary();
        table.string('nomeFantasia').notNullable();
        table.string('telefone').notNullable();
        table.string('email').notNullable();
        table.string('login').notNullable();
        table.string('senha').notNullable();
    });

};

exports.down = function(knex) {
    return knex.schema.dropTable('loja');
};