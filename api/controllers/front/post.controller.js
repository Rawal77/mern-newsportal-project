const { default: mongoose } = require("mongoose");
const { showError } = require("../../lib");
const { Post, Review } = require("../../models");

class PostController {
  latest = async (req, res, next) => {
    try {
      const post = await Post.find({ status: true }).sort({
        createdAt: "desc",
      });
      res.json(post);
    } catch (error) {
      showError(error, next);
    }
  };
  featured = async (req, res, next) => {
    try {
      const post = await Post.find({ status: true, featured: true }).sort({
        createdAt: "desc",
      });
      res.json(post);
    } catch (error) {
      showError(error, next);
    }
  };

  byId = async (req, res, next) => {
    try {
      const posts = await Post.aggregate([
        {
          $match: {
            status: true,
            _id: new mongoose.Types.ObjectId(req.params.id),
          },
        },
      ]);
      const result = [];
      for (let post of posts) {
        const reviews = await Review.aggregate([
          { $match: { post_id: new mongoose.Types.ObjectId(req.params.id) } },
          {
            $lookup: {
              from: "users",
              foreignField: "_id",
              localField: "user_id",
              as: "user",
            },
          },
        ]);
        const list = reviews.map(review => {
          return {
            _id: review._id,
            user_id: review.user_id,
            post_id: review.post_id,
            comment: review.comment,
            createdAt: review.createdAt,
            updatedAt: review.updatedAt,
            user: review.user[0],
          };
        });
        result.push({
          _id: post._id,
          title: post.title,
          description: post.description,
          images: post.images,
          category_id: post.category_id,
          status: post.status,
          featured: post.featured,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          reviews: list,
        });
      }

      res.json(result[0]);
    } catch (error) {
      showError(error, next);
    }
  };

  byCategoryId = async (req, res, next) => {
    try {
      const post = await Post.find({
        status: true,
        category_id: req.params.id,
      });
      res.json(post);
    } catch (error) {
      showError(error, next);
    }
  };
  // byJournalistId = async (req, res, next) => {
  //   try {
  //     const post = await Post.find({ status: true, user_id: req.params.id });
  //     res.json(post);
  //   } catch (error) {
  //     showError(error, next);
  //   }
  // };
  similar = async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id);
      const posts = await Post.find({
        status: true,
        category_id: post.category_id,
        _id: { $ne: req.params.id },
      });
      res.json(posts);
    } catch (error) {
      showError(error, next);
    }
  };
  search = async (req, res, next) => {
    try {
      const post = await Post.find({
        status: true,
        title: { $regex: req.query.term, $options: "i" },
      });
      res.json(post);
    } catch (error) {
      showError(error, next);
    }
  };
}

module.exports = new PostController();
