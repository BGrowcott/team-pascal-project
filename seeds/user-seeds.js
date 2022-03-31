const { User } = require('../models');

const userData = [
    {
        first_name: 'Akash',
        last_name: 'Limbu',
    },
    {
        first_name: 'Ben',
        last_name: 'Growcott',
    }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;