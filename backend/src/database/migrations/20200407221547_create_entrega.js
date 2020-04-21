exports.up = function(knex) {
    return knex.schema.createTable('entrega', function(table) {
        table.increments('idEntrega').unsigned().primary();
        table.string('endereco').notNull();
        table.decimal('valorReceber', 6, 2).notNull();
        table.decimal('troco', 6, 2).notNull();
        table.decimal('frete', 6, 2).notNull();
        table.dateTime('data').notNullable();
        table.string('entregador_id').notNull();
        table.string('loja_id').notNull();

        table.foreign('entregador_id').references('idEntregador').inTable('entregador');
        table.foreign('loja_id').references('idLoja').inTable('loja');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('entrega');
};