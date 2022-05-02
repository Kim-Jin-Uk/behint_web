import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';

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

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'brmnmusic-image-s3',
    key(req, file, cb) {
      cb(null, `project/${Date.now()}_${path.basename(file.originalname)}`);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

module.exports = router;
