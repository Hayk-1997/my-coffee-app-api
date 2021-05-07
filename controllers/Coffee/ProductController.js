const { model } = require('mongoose');
const Product = model('Product');
const Comment = model('Comment');
const Log = require('../../helpers/winston-logger');

class ProductController {
  async createProductComment(req, res) {
    const product = await Product.findById(req._id);
    const newComment = await Comment.create({ content: req.comment });
    product.comments.unshift(newComment._id);
    await product.save();
    return newComment;
  }

  async replyComment(req, res) {
    const comment = await Comment.findById(req.commentId);
    const product = await Product.findById(req._id);
    const reply = await Comment.create({ content: req.comment });
    product.comments.push(reply._id);
    product.save();
    reply.parentId = comment._id;
    return reply.save();

  }
}

module.exports = new ProductController();