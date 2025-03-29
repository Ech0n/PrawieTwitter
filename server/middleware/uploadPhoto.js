const multer = require('multer');
const path = require('path');

// folder na zdjecia
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dirname = path.join(__dirname, '..', 'images');
        cb(null, dirname);
    },
    // nazwy plikow
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// ograniczenie typów plików
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Wrong file format. Allowed: jpeg, png, gif.'), false);
    }
};

const uploadPhoto = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // max rozmiar - 5mb
    }
});

module.exports = uploadPhoto;
