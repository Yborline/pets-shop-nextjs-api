const { uploadToCloudinary } = require("../../service/upload.service");
const { ErrorHandler } = require("../../utils/errorHandler");
const { bufferToDataURI } = require("../../utils/file");

const uploadImg = async (file) => {
  console.log(file);

  if (!file) throw new ErrorHandler(400, "Image is required");

  const fileFormat = file.mimetype.split("/")[1];
  const { base64 } = await bufferToDataURI(fileFormat, file.buffer);

  const imageDetails = await uploadToCloudinary(base64, fileFormat);
  return imageDetails;
};

module.exports = uploadImg;
