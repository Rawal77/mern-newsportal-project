const { showError } = require("../../lib");
const { Post } = require("../../models");
const { unlink } = require("node:fs/promises");

class PostController {
  index = async (req, res, next) => {
    try {
      const post = await Post.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "category_id",
            foreignField: "_id",
            as: "category",
          },
        },
      ]);
      const result = post.map(posts => {
        return {
          _id: posts._id,
          title: posts.title,
          description: posts.description,
          images: posts.images,
          category_id: posts.category_id,
          status: posts.status,
          featured: posts.featured,
          category: posts.category[0],
        };
      });
      res.json(result);
    } catch (error) {
      showError(error, next);
    }
  };
  store = async (req, res, next) => {
    try {
      const { title, description, category_id, featured, status } = req.body;
      const images = req.files.map(img => img.filename);
      console.log(images);

      await Post.create({
        title,
        description,
        category_id,
        featured,
        status,
        images,
      });

      res.json({
        success: "Post Added",
      });
    } catch (error) {
      showError(error, next);
    }
  };
  show = async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id);
      res.json(post);
    } catch (error) {
      showError(error, next);
    }
  };
  update = async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id);
      const { title, description, category_id, featured, status } = req.body;

      const images = [...post.images, ...req.files.map(img => img.filename)];
      await Post.findByIdAndUpdate(req.params.id, {
        title,
        description,
        category_id,
        featured,
        images,
        status,
      });
      res.json({
        success: "Post Updated",
      });
    } catch (error) {
      showError(error, next);
    }
  };
  destroy = async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id);
      for (let img of post.images) {
        await unlink(`uploads/${img}`);
      }
      await Post.findByIdAndDelete(req.params.id);
      res.json({
        success: "Post Removed",
      });
    } catch (error) {
      showError(error, next);
    }
  };

  images = async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id);
      if (post.images.length > 1) {
        unlink(`uploads/${req.params.filename}`);
        const images = post.images.filter(img => img != req.params.filename);
        await Post.findByIdAndUpdate(req.params.id, { images });
        res.json({
          success: "Post image removed",
        });
      } else {
        next({
          message: "At least one image is required for post",
          status: 403,
        });
      }
    } catch (error) {
      showError(error, next);
    }
  };
}

module.exports = new PostController();
