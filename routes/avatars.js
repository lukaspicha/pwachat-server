  
const router = require('express').Router();

const models = require('../models/models.js');


const server = require('../server.js'); 

router.get('/:id?', (req, res) => {

    server.broadcast('ALL', 'ddd', []);
    if(req.params.id) {
        
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.json({message: 'Invalid avatar id.', data: {}}).status(404);
        }

        models.Avatar.findOne({_id: req.params.id}).then(response => res.status(200).json(response)).catch(error => console.error(error));

    } else {
        models.Avatar.find({active: true}).then(response => res.status(200).json(response)).catch(error => console.error(error));
    }
});

module.exports = router;
