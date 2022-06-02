const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const router = express.Router();

try {
  fs.accessSync('projectImages');
} catch (e) {
  fs.mkdirSync('projectImages');
}
AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
});

// const upload = multer({
//   storage: multerS3({
//     s3: new AWS.S3(),
//     bucket: 'brmnmusic-images-s3',
//     key(req, file, cb) {
//       cb(null, `project/${Date.now()}_${path.basename(file.originalname)}`);
//     },
//   }),
//   limits: { fileSize: 20 * 1024 * 1024 * 1024 },
// });

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'projectImages');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + new Date().getTime() + ext);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 * 1024 },
});

//본인 프로필 변경
router.post('/upload/video', upload.single('file'), async (req, res, next) => {
  try {
    console.log(req);
    res.status(200).json('ok');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
