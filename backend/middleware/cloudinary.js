const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "book-world",
    allowedFormats: ["png", "jpg", "jpeg"],
    public_id: (req, file) => {
      const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      return uniquePrefix;
    },
  },
});

module.exports = cloudStorage;
