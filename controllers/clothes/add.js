// const clothesOperations = require("../../models/clothes");
// const { uploadToCloudinary } = require("../../service/upload.service");
// const { ErrorHandler } = require("../../utils/errorHandler");
// const { bufferToDataURI } = require("../../utils/file");
// const createError = require("http-errors");

const { ErrorHandler } = require("../../utils/errorHandler");
const { Cloth } = require("../../models");
const uploadImg = require("./uploadImg");

const add = async (req, res, next) => {
  try {
    const { files, body } = req;
    // console.log(files);
    console.log(body.description);
    const { _id } = req.user;
    // const { code: uniq } = body;
    // const image = await uploadImg(file);
    const countProject = await Cloth.find({}).countDocuments({});
    let code = 1;
    if (countProject) {
      const projectLast = await Cloth.find({}).sort({ code: -1 }).limit(1);
      code = Number(projectLast[0].code) + 1;
    }

    const array = [];

    for (const file of files) {
      const oneFile = await uploadImg(file);

      array.push({
        name: file.originalname,
        size: oneFile.bytes,
        url: oneFile.url,
        public_id: oneFile.public_id,
        secure_url: oneFile.secure_url,
      });
    }
    const sortArray = array.sort((a, b) => a.originalname - b.originalname);
    console.log(array);
    const data = await Cloth.create({
      ...body,
      code: String(code).padStart(9, "0"),
      image: sortArray,
      owner: _id,
    });

    res.json({
      status: "success",
      code: 201,
      data,
    });
  } catch (error) {
    next(new ErrorHandler(error.statusCode || 500, error.message));
  }
};

module.exports = add;

// const { Cloth } = require("../../models");

// const add = async (req, res) => {
//   const { _id } = req.admin;
//   const result = await Cloth.create({ ...req.body, owner: _id });
//   res.status(201).json({
//     status: "success",
//     code: 201,
//     data: { result },
//   });
// };
// module.exports = add;

// const { ErrorHandler } = require("../../utils/errorHandler");
// const { Cloth } = require("../../models");
// const uploadImg = require("./uploadImg");
// const createError = require("http-errors");

// const add = async (req, res, next) => {
//   try {
//     const { files, body } = req;
//     // console.log(files);

//     const { _id } = req.user;
//     const { code: uniq } = body;
//     // const image = await uploadImg(file);
//     const clothes = await Cloth.findOne({ code: uniq });

//     if (clothes) {
//       throw createError(404, `Such a code already exists!`);
//     }

//     const array = [];

//     for (const file of files) {
//       const oneFile = await uploadImg(file);
//       // console.log(oneFile);
//       array.push({
//         url: oneFile.url,
//         public_id: oneFile.public_id,
//         secure_url: oneFile.secure_url,
//       });
//     }

//     // array.push(oneFile);

//     const data = await Cloth.create({
//       ...body,
//       image: array,
//       owner: _id,
//     });

//     res.json({
//       status: "success",
//       code: 201,
//       data,
//     });
//   } catch (error) {
//     next(new ErrorHandler(error.statusCode || 500, error.message));
//   }
// };

// module.exports = add;
