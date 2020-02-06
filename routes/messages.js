 
const router = require('express').Router();

const models = require('../models/models.js');

const server = require('../server.js'); 

router.post('/', (req, res) => {

    const newMessage = new models.Message({
        sender: req.body.sender_id,
        receiver: req.body.receiver_id,
        text: req.body.text,
        created: new Date(),
    });

    if(newMessage.save()) {
        res.status(201).json({
            message: 'Message has been sended.'
        });
        server.broadcast('#NEW-MESSAGE', req.body.receiver_id, {
            //sender: req.params.id,
            sender: req.body.sender_id,
        });

        server.broadcast('#NEW-MESSAGE', req.body.sender_id, {
            //sender: req.params.id,
            sender: req.body.receiver_id,
        });
    } else {
        res.status(500).json({message: 'Something is wrong'});
    }
    return;
});


router.get('/:sender_id/:receiver_id/', (req, res) => {

    const query = {
        $or: [
            {
                sender: req.params.sender_id,
                receiver: req.params.receiver_id
            },
            {
                sender: req.params.receiver_id,
                receiver: req.params.sender_id
            }
        ]
    };
    const populate = [
        { 
            path: 'sender',
            model: models.User,
            populate: {
                path: 'avatar',
                model: models.Avatar
            }
        },
        { 
            path: 'receiver',
            model: models.User,
            populate: {
                path: 'avatar',
                model: models.Avatar
            }
        }
    ];
    models.Message.find(query).populate(populate).sort({created: 1}).then(response => res.status(200).json(response)).catch(error => console.error(error));
});

module.exports = router;
