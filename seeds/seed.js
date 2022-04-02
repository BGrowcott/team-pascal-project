const seedUsers = require('./userSeeds.json');
const { User } = require('../models');
const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    const users = await User.bulkCreate(seedUsers, {
        individualHooks: true,
        returning: true,
    })

}

seedAll();