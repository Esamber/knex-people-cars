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

const addPerson = async person => {
    await knex('people').insert(person);
}

const getAll = async () => {
    const people = await knex.from('people')
        .leftJoin('cars', 'people.id', 'cars.personId')
        .select('people.*').count({ carCount: 'cars.personId' })
        .groupBy('people.firstName', 'people.lastName', 'people.age', 'people.id');
    console.log(people);
    return(people);
}

const getPersonById = async id => {
    console.log({id});
    return await knex('people').where('id',id).select('*').first();
}

module.exports = {
    addPerson,
    getAll,
    getPersonById
}