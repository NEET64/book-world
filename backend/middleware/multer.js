const multer = require("multer");

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/thumbnail");
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniquePrefix + "-" + file.originalname);
  },
});

module.exports = diskStorage;
