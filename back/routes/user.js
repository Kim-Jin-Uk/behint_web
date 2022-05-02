import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';
import { isLoggendIn } from './middlewares';
import { User, Agreement, Information, Profile } from '../models';
const router = express.Router();

try {
  fs.accessSync('profileImages');
} catch (e) {
  fs.mkdirSync('profileImages');
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
      cb(null, `profile/${Date.now()}_${path.basename(file.originalname)}`);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

//유저 로그아웃
router.post('/logout', isLoggendIn, async (req, res, next) => {
  try {
    req.logout();
    req.session.destroy();
    res.status(200).send('ok');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//본인 약관정보 조회
router.get('/agreement', isLoggendIn, async (req, res, next) => {
  try {
    const userData = await User.findOne({
      where: { id: req.user.id },
      include: [{ model: Agreement, attributes: ['id'] }],
    });
    res.status(200).json(userData);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//유저 프로필 조회
router.get('/profile', async (req, res, next) => {
  try {
    const userData = await User.findOne({
      where: { email: req.body.email },
      include: [
        { model: Information, attributes: ['id'] },
        { model: Profile, attributes: ['id'] },
      ],
    });
    res.status(200).json(userData);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//유저 프로필 업데이트
router.put('/profile', async (req, res, next) => {
  try {
    res.status(200).json('profile update');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
