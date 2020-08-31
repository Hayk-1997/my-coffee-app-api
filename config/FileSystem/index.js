const multer = require('multer');
const fs = require('fs-extra');
// Set the default directory
const DIR = './public/uploads/';
// Handle Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (['png', 'jpg', 'jpeg'].some((suffix) => suffix.endsWith(file.mimetype.split('/')[1]))) {
      const path = DIR + req.url.substring(1);
      fs.mkdirsSync(path);
      cb(null, path);
    }
  },
  filename: (req, file, cb) => {
    if (['png', 'jpg', 'jpeg'].some((suffix) => suffix.endsWith(file.mimetype.split('/')[1]))) {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, Date.now() + '-' + fileName);
    }
  }
});
// Check the mimetype
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.originalname !== 'blob' && ['png', 'jpg', 'jpeg'].some((suffix) => suffix.endsWith(file.mimetype.split('/')[1]))) {
      if (['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    }
    else {
      cb(null, false);
    }
  }
});

module.exports = upload;