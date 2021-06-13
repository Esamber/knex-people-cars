const router = require('express').Router();
const peopleDb = require('../db/people');
const carsDb = require('../db/cars');

router.post('/addperson', async (req, res) => {
    const { firstName, lastName, age } = req.body;
    await peopleDb.addPerson({firstName, lastName, age});
    res.json({ status: 'ok' });
});

router.get('/getpeople', async (req, res) => {
    const people = await peopleDb.getAll();
    res.json(people);
})

router.post('/addcar', async (req, res) => {
    await carsDb.addCar(req.body);
    res.json({ status: 'ok' });
});

router.get('/getcars', async (req, res) => {
    const cars = await carsDb.getAll(req.query.id);
    res.json(cars);
})

router.get('/getpersonbyid', async (req, res) => {
    const person = await peopleDb.getPersonById(req.query.id);
    res.json(person);
})

router.post('/deletecars', async (req, res) => {
    await carsDb.deleteCars(req.query.id);
    res.json({status: 'ok'});
})

module.exports = router;