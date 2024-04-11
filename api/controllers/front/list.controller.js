const { Category, User } = require("../../models");

class ListController {
  categories = async (req, res, next) => {
    try {
      const categories = await Category.find({ status: true });
      res.json(categories);
    } catch (error) {
      showError(error, next);
    }
  };
  categoryById = async (req, res, next) => {
    try {
      const category = await Category.findOne({
        status: true,
        _id: req.params.id,
      });
      res.json(category);
    } catch (error) {
      showError(error, next);
    }
  };
  // journalist = async (req, res, next) => {
  //   try {
  //     const journalist = await User.aggregate([
  //       { $match: { status: true } },
  //       {
  //         $lookup: {
  //           from: "posts",
  //           localField: "_id",
  //           foreignField: "post_id",
  //           as: "post",
  //         },
  //       },
  //     ]);
  //     const result = journalist.map(journ => {
  //       return {
  //         _id: journ._id,
  //         name: journ.name,
  //         post: journ.post[0],
  //       };
  //     });
  //     res.json(result);
  //   } catch (error) {
  //     showError(error, next);
  //   }
  // };
  // journalistById = async (req, res, next) => {
  //   try {
  //   } catch (error) {
  //     showError(error, next);
  //   }
  // };
}

module.exports = new ListController();
