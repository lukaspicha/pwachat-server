
const router = require('express').Router();

const models = require('../models/models.js');

const server = require('../server.js'); 

router.get('/:id?', (req, res) => {
    if(req.params.id) {

        if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.json({message: 'Invalid user id.', data: {}}).status(404);
        }

        models.User.findOne({_id: req.params.id}).populate('avatar').then(response => res.status(200).json(response)).catch(error => console.error(error));
    } else {
        models.User.find({}).populate('avatar').then(response => res.status(200).json(response)).catch(error => console.error(error));
    }
});


router.put('/:id', async function(req, res) {

        if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.json({message: 'Invalid user id.', data: {}}).status(400);
        }

        models.User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}).populate({path: 'avatar', model: models.Avatar}).exec(function(err, user) {
            if (err) { 
                return res.status(500).json({ data: err }); 
            }
            if (!user) { 
                return res.status(404).json({ message: 'Invalid user id.' }); 
            }
            server.broadcast('#UPDATE-USERS', '#ALL', []);
            return res.json(user).status(200);
        });
    });


module.exports = router;

    

    

