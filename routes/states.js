 
const router = require('express').Router();

const models = require('../models/models.js');

router.get('/', (req, res) => {
    models.State.find().then(response => res.status(200).json(response)).catch(error => console.error(error));
});

module.exports = router;