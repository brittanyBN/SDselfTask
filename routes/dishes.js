const express = require('express');
const router = express.Router();
const CyclicDB = require('@cyclic.sh/dynamodb')
const db = CyclicDB(process.env.CYCLIC_DB)
let dishes = db.collection('dishes')

router.get('/dishes', async function(req, res, next) {
    let list = await dishes.list();
    res.send(list);
});

router.get('/dishes/:key', async function(req, res, next) {
    let dish = await dishes.get(req.params.key);
    res.send(dish);
});

router.post('/dishes', async function(req, res, next) {
    const {dishName, country} = req.body;
    await dishes.set(dishName, {
        country: country
    })
    res.end();
});

router.put('/dishes', async function(req, res, next) {
    const {dishName, country} = req.body;
    await dishes.set(dishName, {
        country: country
    })
    res.end();
});

router.delete('/:key', async function(req, res, next) {
    await dishes.delete(req.params.key);
    res.end();
});

module.exports = router;
