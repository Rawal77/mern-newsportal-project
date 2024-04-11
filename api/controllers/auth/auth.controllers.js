const { showError } = require("../../lib");
const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthController {
  register = async (req, res, next) => {
    try {
      const { name, address, password, confirm_password, email, phone } =
        req.body;
      if (await User.findOne({ email })) {
        next({
          message: "Email already exist",
          status: 409,
        });
      } else {
        if (password === confirm_password) {
          const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
          await User.create({ name, address, phone, password: hash, email });
          res.json({
            success: "Thanks for registering",
          });
        } else {
          next({
            message: "Password not confirmed",
            status: 422,
          });
        }
      }
    } catch (error) {
      showError(error, next);
    }
  };
  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          const token = jwt.sign(
            {
              id: user._id,
              iat: Math.floor(Date.now() / 1000) - 30,
              exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
            },
            process.env.JWT_SECRET
          );
          res.json({ token, user });
        } else {
          next({
            message: "Password not valid",
            status: 422,
          });
        }
      } else {
        next({
          message: "Email not valid",
          status: 422,
        });
      }
    } catch (error) {
      showError(error, next);
    }
  };
}

module.exports = new AuthController();
