// const { User } = require("../../models");

const getCurrent = async (req, res) => {
  const { name, email } = req.admin;
  res.json({
    status: "success",
    code: 200,
    data: {
      name,
      email,
    },
  });
};

module.exports = getCurrent;
