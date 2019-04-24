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

module.exports.handleProfileGet = (req, res) => {
    const { userId } = req.params;
    db.select('*').from('users').where({
        id: userId
    }).then(user => {
        if (user.length) {
            res.json(user[0]);
        } else {
            res.status(400).json('Not found');
        }

    })
        .catch(err => res.status(400).json('error getting user'))

}