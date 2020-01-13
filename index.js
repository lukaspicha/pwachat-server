
const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');
    mongoose.set('useFindAndModify', false);
    mongoose.connect('mongodb://localhost:27017/pwachat', {useNewUrlParser: true, useUnifiedTopology: true});

const cors = require('cors'); // pro testovani z localhostu https://expressjs.com/en/resources/middleware/cors.html

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors());



app.use('/v1/avatars', require('./routes/avatars.js'));
app.use('/v1/states', require('./routes/states.js'));
app.use('/v1/users', require('./routes/users.js'));
app.use('/v1/auth', require('./routes/auth.js'));
app.use('/v1/messages', require('./routes/messages.js'));
app.use('/v1/rooms', require('./routes/rooms.js'));

app.get('/', (req, res) => {
    res.send({message: 'Server is running.', data: {
        version: 'v1',
        routes: [
            'avatars',
            'states',
            'auth',
            'messages',
            'rooms'
        ],
    }});
});

app.all('*', (req, res) => {
    return res.status(204).send({});
});

app.listen(3000, () => console.log('Listening on port 3000...'));
