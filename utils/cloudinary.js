const cloudinary = require("cloudinary").v2;
const {
  cloudinaryName,
  cloudinaryApiKey,
  cloudinaryApiSecret,
} = require("../constants/cloudinary");

cloudinary.config({
  cloud_name: cloudinaryName,
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryApiSecret,
});
module.exports = cloudinary;
