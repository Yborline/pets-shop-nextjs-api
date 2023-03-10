const { User } = require("../../models");
// const { Unauthorized } = require("http-errors");
const createError = require("http-errors");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
// const { ErrorHandler } = require("../../utils/errorHandler");

const { JWT_KEY } = process.env;

const login = async (req, res) => {
  // try {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.comparePassword(password)) {
    throw createError(401, "Email or password is wrong ");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_KEY, { expiresIn: "1h" });
  if (token) {
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
      status: "success",
      code: 200,
      token,
      user: { name: user.name, email: user.email, user: user.user },
    });
  }
  res.status(401).json({ message: "Email or password is wrong" });
  // } catch (error) {
  //   next(new ErrorHandler(error.statusCode || 500, error.message));
  // }
};

module.exports = login;

// const { User, Admin } = require("../../models");
// const { Unauthorized } = require("http-errors");
// // const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// require("dotenv").config();

// const { JWT_KEY } = process.env;

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   const admin = await Admin.findOne({ email });

//   if (
//     (!user || !user.comparePassword(password)) &&
//     (!admin || !admin.comparePassword(password))
//   ) {
//     throw new Unauthorized("Email or password is wrong ");
//   }
//   //   if (!user) {
//   //     throw new Unauthorized("Email or password is wrong ");
//   //   }

//   //   const passCompare = bcrypt.compareSync(password, user.password);
//   //   if (!passCompare) {
//   //     throw new Unauthorized("Email or password is wrong ");
//   //   }

//   const payloadAdmin = {
//     id: admin._id,
//   };

//   const payloadUser = {
//     id: user._id,
//   };

//   const token = jwt.sign(
//     admin._id !== null ? payloadAdmin : payloadUser,
//     JWT_KEY,
//     {
//       expiresIn: "1h",
//     }
//   );
//   res.json({
//     status: "success",
//     code: 200,
//     data: {
//       token,
//     },
//   });
// };

// module.exports = login;
