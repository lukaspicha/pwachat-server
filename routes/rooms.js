
const router = require('express').Router();

const models = require('../models/models.js');

router.get('/:id?', (req, res) => {
    var populate = {
        path: 'users',
        model: models.User,
        populate: {
            path: 'avatar',
            model: models.Avatar
        }
    };

    if(req.params.id) {
        if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.json({message: 'Invalid room id.', data: {}}).status(404);
        }
        models.Room.findOne({_id: req.params.id}).populate(populate).then(response => res.status(200).json(response)).catch(error => console.error(error));
    } else {
        models.Room.find().populate(populate).then(response => res.status(200).json(response)).catch(error => console.error(error));
    }
});

router.post('/v1/rooms/create/:master_id', (req, res) => {
    var room = new models.Room({
        created: Date(),
        users: [
            req.params.master_id
        ],
        messages: []
    });
    if(room.save()) {
        res.status(201).json(room);
    } else {
        res.status(500).json('Something is wrong ...');
    }
    return;
});

module.exports = router;

