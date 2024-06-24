import multer from 'multer';
import path from 'path';

const museumStorage = multer.diskStorage({
  destination: function(req, res, cb){
    cb(null, './gambar/gambarMuseum/'); // Adjust destination folder as needed
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
})

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

const museumUpload = multer({
  storage: museumStorage,
  limits: { fileSize: 100000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).fields([
  { name: 'gambar_thumbnail', maxCount: 1 },
  { name: 'gambar1', maxCount: 1 },
  { name: 'gambar2', maxCount: 1 },
  { name: 'gambar3', maxCount: 1 }
]);

export default museumUpload;