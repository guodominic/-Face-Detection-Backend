const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile')
const image = require('./controllers/image')
const deleted = require('./controllers/delete')

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    }
});

/* db.select('*').from('users').then(data => {
    console.log(data);
}); */

const app = express();
app.use(express.json());
app.use(cors());


app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })

app.delete('/delete/:id', deleted.handleDelete(db))


app.get('/', (req, res) => { res.send('it is working') })
//app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })


app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})






