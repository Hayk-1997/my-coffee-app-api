const { model } = require('mongoose');
require('../models');
const Comment = model('Comment');
const logs = require('../helpers/logs');

const data = {
  content: 'content',
  parentId: null
};

const CommentSeeding = () => Comment.create(data, (error, success) => {
  logs(`[Seeding Error]: ${error}`);
  logs(`[Seeding Success]: ${success}`);
});

module.exports = CommentSeeding;