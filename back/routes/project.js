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
router.post('/thumbnail', async (req, res, next) => {
  const url = req.body.url;
  ffmpeg.ffprobe(url, function (err, metadata) {
    //url을 받으면 해당 비디오에대한 정보가 metadata에담김
    console.log('metadata', metadata); //metadata안에담기는 모든정보들 체킹
    fileDuration = metadata.format.duration; //동영상길이대입
  });
  //썸네일 생성
  ffmpeg(url) //클라이언트에서보낸 비디오저장경로
    .on('filenames', function (filenames) {
      //해당 url에있는 동영상을 밑에 스크린샷옵션을 기반으로
      //캡처한후 filenames라는 이름에 파일이름들을 저장
      console.log('will generate ' + filenames.join(','));
      console.log('filenames:', filenames);

      filePath = 'http://localhost:3095/' + filenames[0];
    })
    .on('end', function () {
      console.log('Screenshots taken');
      return res.json({
        success: true,
        url: filePath,
        fileDuration: fileDuration,
      });
      //fileDuration :비디오 러닝타임
    })
    .on('error', function (err) {
      console.log(err);
      return res.json({ success: false, err });
    })
    .screenshots({
      //Will take screenshots at 20% 40% 60% and 80% of the video
      count: 1,
      folder: 'projectImages',
      size: '320x240',
      //'%b':input basename(filename w/o extension) = 확장자제외파일명
      filename: 'thumbnail-%b.png',
    });
});

module.exports = router;
