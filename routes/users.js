
const router = require('express').Router();

const models = require('../models/models.js');

router.get('/:id?', (req, res) => {
    if(req.params.id) {

        if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.json({message: 'Invalid user id.', data: {}}).status(404);
        }

        models.User.findOne({_id: params.id}).populate('avatar').then(response => res.status(200).json(response)).catch(error => console.error(error));
    } else {
        models.User.find({}).populate('avatar').then(response => res.status(200).json(response)).catch(error => console.error(error));
    }
});


module.exports = router;

    

    // app.put('/v1/users/:id', async function(req, res) {

    //     if(!mongoose.Types.ObjectId.isValid(req.body.id)) {
    //         return res.json({message: 'Bad user id.', data: {}}).status(400);
    //     }

    //     User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, user) {
    //         if (err) { 
    //             return res.status(500).json({ data: err }); 
    //         }
    //         if (!user) { 
    //             return res.status(404).json({ message: 'Invalid user id.' }); 
    //         }
    //         broadcast('#UPDATE-USERS', '#ALL', []);
    //         return res.json(user).status(200);
    //     });
    // });

