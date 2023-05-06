const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    // WILL NEED TO ADD THIS BACK IN TO HASH PASSWORD, WHEN I HAVE ADDED HASH PASSWORD FUNCTION TO USER MODEL
    // individualHooks: true,
    returning: true,
  });

  const posts = await Post.bulkCreate(postData, {
    returning: true,
  });

  const comments = await Comment.bulkCreate(commentData, {
    returning: true,
  });

  process.exit(0);
};

seedDatabase();