const User = require('./User');
const Blogposts = require('./Blogposts');
const Comments = require('./Comments');
User.hasMany(Blogposts, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Blogposts.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Blogposts.hasMany(Comments, {
  foreignKey: 'blogposts_id',
  onDelete: 'CASCADE'
});

Comments.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comments.belongsTo(Blogposts, {
  foreignKey: 'blogposts_id',
  onDelete: 'CASCADE'
});

User.hasMany(Comments, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});


module.exports = { User, Blogposts, Comments };

