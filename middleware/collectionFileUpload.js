// middleware/fileUpload.js

import multer from 'multer';
import path from 'path';

// Set storage engine
const collectionStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './gambar/gambarKoleksiMuseum/'); // Adjust destination folder as needed
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});



// Check File Type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// Init upload
const collectionUpload = multer({
  storage: collectionStorage,
  limits: { fileSize: 100000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('gambar_koleksi');



export default collectionUpload;
