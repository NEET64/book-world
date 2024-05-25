const cloudStorage = require("./cloudinary.js");
const diskStorage = require("./multer.js");

const multer = require("multer");

const upload = multer({ storage: cloudStorage });

module.exports = upload;
