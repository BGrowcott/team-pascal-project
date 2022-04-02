const User = require('./User');
const Forum = require('./Forum');
const Comment = require('./Comment');

User.hasMany(Forum, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Forum.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Forum, {
  foreignKey: 'forum_id'
});

Forum.hasMany(Comment, {
  foreignKey: 'forum_id',
  onDelete: 'CASCADE'
});

module.exports = { User, Forum, Comment };