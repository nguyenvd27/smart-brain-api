const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// const db = knex({
//     client: 'pg',
//     connection: {
//         host: '127.0.0.1',
//         user: 'myuser',
//         password: '123',
//         database: 'mydb'
//     }
// });

// db.select('*').from('users').then(data => {
//     console.log(data);
// });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// app.get('/', (req, res) => {
//     res.send(database.users);
// });

app.post('/signin', signin.handleSignin);
app.post('/register', register.handleRegister);
app.get('/profile/:userId', profile.handleProfileGet);
app.put('/image', image.handleImage);
app.post('/imageurl', image.handleApiCall);

app.listen(3000, () => {
    console.log('app is running on port 3000');
});


/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/

