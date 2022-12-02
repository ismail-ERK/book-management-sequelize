const multer = require('multer');
const path = require('path');
// -----------------------------------------------------------------

// C'est pas moi qui a invoquer ce code d'upload image je l'ai trouvé sur internet

// ---------------------------------------------------------------
const storageEngine = multer.diskStorage({
    destination: './public/images/users',
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    },
});

const upload = multer({
    storage: storageEngine,
    limits: { fileSize: 10000000000 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
});

const checkFileType = function (file, cb) {
    const fileTypes = /jpeg|jpg|png|gif|svg/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    if (mimeType && extName) {
        return cb(null, true);
    } else {
        cb('Error: You can Only Upload Images!!');
    }
};

module.exports= upload;