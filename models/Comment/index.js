const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const CommentSchema = new Schema({
  content: { type: String, required: true },
  parentId: {
    type: Schema.Types.ObjectId, ref: 'Comment'
  }
});

const populate = field => {
  return function(next) {
    this.populate(field);
    next();
  };
};

CommentSchema.pre('find', populate('comments'));

module.exports = model('Comment', CommentSchema);