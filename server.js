const exp = require('express');
const knex = require('knex');
const dotenv = require('dotenv');
const { createUser, updateScore } = require('./playersData/db.js')

const app = exp();
dotenv.config();
app.listen(process.env.PORT, () => {
    console.log(`listen on port ${process.env.PORT}`);
})

app.use('/', exp.static(__dirname + '/PacMan'));
app.use(exp.urlencoded({ extended: true }));
app.use(exp.json());


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pacman/index.html')
})

const db = knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        port: '5432',
        user: 'postgres',
        password: 'romy2401',
        database: 'hackaton#2'
    }
})

//creat new player
app.post('/player', (req, res) => {
    console.log(req.body);
    {}
    createUser(req.body)
        .then(data => {
            console.log(data);
            res.send({ message: 'OK' })
        })
        .catch(err => {
            console.log(err);
            res.json({ message: err.message })
        })
})

//update player score
app.put('/player/score', (req, res) => {
    const { user_name, score } = req.body;
    updateScore(user_name, score)
        .then(data => {
            console.log(data);
            res.send({ message: 'OK' })
        })
        .catch(err => {
            console.log(err);
            res.json({ message: err.message })
        })

})

//display top scores
app.get('/player/best_scores', (req, res) =>{
    db('users')
        .select('user_name', 'score')
        .then(data => {
            console.log(data);
            res.send(data)
        })
        .catch(err => {
            console.log(err);
            res.send({ message: err.detail })
        })
})







