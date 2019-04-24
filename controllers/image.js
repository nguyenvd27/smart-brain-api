const Clarifai = require('clarifai');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'myuser',
        password: '123',
        database: 'mydb'
    }
});

const app = new Clarifai.App({
    apiKey: 'd1abd23fd8ea4309836fb8d842b0db59'
  });

module.exports.handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .then(err => res.status(400).json('unable to work with API'))
  }


module.exports.handleImage = (req, res) => {
    const { id } = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get entries'))
}