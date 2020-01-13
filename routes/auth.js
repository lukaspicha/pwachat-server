 
const router = require('express').Router();

const models = require('../models/models.js');

const bcrypt = require('bcrypt');

const server = require('../server.js'); 

router.post('/login', (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.body.id)) {
        return res.json({message: 'Bad login id or password.', data: {}}).status(401);
    }

    models.User.findOne({_id: req.body.id}).populate({path: 'avatar', model: models.Avatar}).exec(function(err, user) {
        if(user) {
            if(bcrypt.compareSync(req.body.password, user.password)) {
                user.status = "online";
                user.save();
                server.broadcast('#UPDATE-USERS', '#ALL', []);
                return res.json({message: 'Login succesfull.',  data: user}).status(200);
            } else {
                return res.json({message: 'Bad login in  or password.',  data: {}}).status(401);
            }
        } else {
            //melo by osetrit uz valid na objectId, ale radsi to jeste necham tady
            return res.json({message: 'Bad login id or password.', data: {}}).status(401);
        }
    });
});

router.put('/logout', (req, res) => {
    if(!mongoose.Types.ObjectId.isValid(req.body.id)) {
        return res.json({message: 'Bad login id.', data: {}}).status(400);
    }

    models.User.findOne({_id: req.body.id}, function(err, user) {
        if (err) { 
            return res.status(500).json({ data: err }); 
        }
        if(user) {
            user.status = 'offline';
            user.save();
            server.broadcast('#UPDATE-USERS', '#ALL', []);
            return res.status(200).json({ message: 'Logout was succesfull.', data: {} });
        }
    });
});

module.exports = router;