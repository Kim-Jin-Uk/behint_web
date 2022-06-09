const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const ffmpeg = require('fluent-ffmpeg');

const router = express.Router();

try {
  fs.accessSync('projectImages');
} catch (e) {
  fs.mkdirSync('projectImages');
}
try {
  fs.accessSync('thumbnails');
} catch (e) {
  fs.mkdirSync('thumbnails');
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
      done(null, basename.replaceAll(' ', '') + new Date().getTime() + ext);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 * 1024 },
});

//비디오 업로드
router.post('/upload/video', upload.single('file'), async (req, res, next) => {
  try {
    const url = `http://localhost:3095/${req.file.filename}`;
    console.log(url);
    res.status(200).json(url);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//썸네일 업로드
router.post('/thumbnail', upload.single('file'), async (req, res, next) => {
  try {
    const url = `http://localhost:3095/${req.file.filename}`;
    console.log(url);
    res.status(200).json(url);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
