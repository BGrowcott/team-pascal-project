const userData = require('./userData.json');
const { User, Forum, Comment, Account, Follow } = require('../models');
const sequelize = require('../config/connection');
const accountData = require('./accountdata.json');
const forumData = require('./forumData.json');
const commentData = require('./commentdata.json');
const followData = require('./followdata.json');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  const accounts = await Account.bulkCreate(accountData, {
    individualHooks: true,
    returning: true,
  });


  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const forum of forumData) {
    await Forum.create({
      ...forum,
    });
  }

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
    });
  }

  for (const follow of followData) {
    await Follow.create({
      ...follow,
    });
  }

  process.exit(0);
};

seedAll();
