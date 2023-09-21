// const clothesOperations = require("../../models/clothes");
const { Cloth } = require("../../models");
const { ErrorHandler } = require("../../utils/errorHandler");

const getPage = async (req, res, next) => {
  // поиск своих товаров только определенному юзеру
  // const { _id, name, email } = req.admin;

  // const clothes = await Cloth.find({ owner: _id }).populate(
  //   "owner",
  //   "_id name email"
  // );
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const clothesAll = await Cloth.find({});
    const allPage = Math.ceil(clothesAll.length / limit);
    const data = await Cloth.find({}, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id name email");

    res.json({
      status: "success",
      code: 200,
      data,
      allPage,
    });
  } catch (error) {
    next(new ErrorHandler(error.statusCode || 500, error.message));
  }
};

module.exports = getPage;
