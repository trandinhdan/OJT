// backend/middleware/multerConfig.js
const multer = require("multer");
const path = require("path");

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, "../../Frontend/public/images"));
    },
    filename: (req, file, cb) => {
        cb(
            null,
            new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname,
        );
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ storage: fileStorage, fileFilter: fileFilter });

module.exports = upload;
