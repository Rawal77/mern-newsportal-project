const { showError } = require("../../lib");
const { User } = require("../../models");
const bcrypt = require("bcryptjs");

class JournalistController {
  index = async (req, res, next) => {
    try {
      const users = await User.find({ type: "Journalist" });
      res.json(users);
    } catch (error) {
      showError(error, next);
    }
  };
  store = async (req, res, next) => {
    try {
      const {
        name,
        address,
        phone,
        email,
        password,
        confirm_password,
        status,
      } = req.body;
      if (await User.findOne({ email })) {
        next({
          message: "Email already exist",
          status: 409,
        });
      } else {
        if (password === confirm_password) {
          const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
          await User.create({
            name,
            address,
            email,
            phone,
            status,
            password: hash,
            type: "Journalist",
          });
          res.json({
            success: "Journalist Added",
          });
        } else {
          next({
            message: "PAssword doesn't match",
            status: 422,
          });
        }
      }
    } catch (error) {
      showError(error, next);
    }
  };
  show = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      res.json(user);
    } catch (error) {
      showError(error, next);
    }
  };
  update = async (req, res, next) => {
    try {
      const { name, address, phone, status } = req.body;
      await User.findByIdAndUpdate(req.params.id, {
        name,
        address,
        phone,
        status,
      });
      res.json({
        success: "Journalist Updated",
      });
    } catch (error) {
      showError(error, next);
    }
  };
  destroy = async (req, res, next) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({
        success: "Journalist Removed",
      });
    } catch (error) {
      showError(error, next);
    }
  };
}

module.exports = new JournalistController();
