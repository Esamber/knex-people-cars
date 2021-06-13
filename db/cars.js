const knex = require('knex')({
    client: 'mssql',
    connection: {
      server: 'localhost',
      user: 'db_user',
      password: 'foobar1',
      database: 'people-cars-node',
      options: {
        port: 1433,
        instanceName: 'SQLEXPRESS'
      }
    }
});

const addCar = async car => {
    await knex('cars').insert(car);
}

const getAll = async (personId) => {
    return await knex('cars').select("*").where({personId});
}

const deleteCars = async (personId) => {
    return await knex('cars').where({personId: personId}).del();
}

module.exports = {
    addCar,
    getAll,
    deleteCars
}