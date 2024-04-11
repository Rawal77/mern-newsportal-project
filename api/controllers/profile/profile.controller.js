const { default: mongoose } = require("mongoose");
const { showError } = require("../../lib");
const { User, Review } = require("../../models");
const bcrypt = require("bcryptjs");

class ProfileController {
  detail = async (req, res, next) => {
    try {
      res.json(req.user);
    } catch (error) {
      showError(err, next);
    }
  };
  profile = async (req, res, next) => {
    try {
      const { name, address, phone } = req.body;
      await User.findByIdAndUpdate(req.uid, {
        name,
        address,
        phone,
      });
      res.json({
        success: "Profile Updated",
      });
    } catch (error) {
      showError(error, next);
    }
  };
  password = async (req, res, next) => {
    try {
      const { old_password, new_password, confirm_password } = req.body;

      if (bcrypt.compareSync(old_password, req.user.password)) {
        if (new_password === confirm_password) {
          const hash = bcrypt.hashSync(new_password, bcrypt.genSaltSync(10));
          await User.findByIdAndUpdate(req.uid, { password: hash });
          res.json({
            success: "Password updated",
          });
        } else {
          next({
            message: "Password not confirmed",
            status: 400,
          });
        }
      } else {
        next({
          status: 422,
          message: "Password is incorrect",
        });
      }
    } catch (error) {
      showError(error, next);
    }
  };
  addReview = async (req, res, next) => {
    try {
      const { comment } = req.body;
      await Review.create({
        comment,
        post_id: req.params.id,
        user_id: req.uid,
      });
      res.json({
        success: "Thank you for your review",
      });
    } catch (error) {
      showError(error, next);
    }
  };
  review = async (req, res, next) => {
    try {
      const reviews = await Review.aggregate([
        { $match: { user_id: new mongoose.Types.ObjectId(req.uid) } },
        {
          $lookup: {
            from: "posts",
            localField: "post_id",
            foreignField: "_id",
            as: "post",
          },
        },
      ]);
      const result = reviews.map(review => {
        return {
          _id: review._id,
          user_id: review.user_id,
          post_id: review.post_id,
          comment: review.comment,
          createdAt: review.createdAt,
          updatedAt: review.updatedAt,
          post: review.post[0],
          __v: review.__v,
        };
      });
      res.json(result);
    } catch (error) {
      showError(error, next);
    }
  };
}

module.exports = new ProfileController();
