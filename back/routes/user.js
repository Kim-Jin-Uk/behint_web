const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const { isLoggendIn } = require('./middlewares');
const { User, Agreement, Information, Profile } = require('../models');
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
    bucket: 'brmnmusic-images-s3',
    key(req, file, cb) {
      cb(null, `profile/${Date.now()}_${path.basename(file.originalname)}`);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

//유저 로그인 확인
router.post('/login', isLoggendIn, async (req, res, next) => {
  try {
    const { id } = req.user.dataValues;
    const userData = await User.findOne({
      where: { id: id },
      include: [{ model: Profile }, { model: Information }],
    });
    res.status(200).json(userData);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//다른 유저 프로필 조회
router.get('/profile/:userId', async (req, res, next) => {
  try {
    let userData = await User.findOne({
      where: { id: req.params.userId },
      include: [
        { model: Profile },
        { model: Information },
        {
          model: User,
          as: 'Followers',
          attributes: ['id'],
        },
      ],
    });
    console.log(userData);
    res.status(200).json(userData);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//다른 유저 프로필 조회 -리스트
router.post('/profile', async (req, res, next) => {
  try {
    console.log(req.body);
    const userDataList = {};
    for (let id of req.body) {
      const userData = await User.findOne({
        where: { id: id },
        include: [{ model: Profile }],
      });
      userDataList[`${id}`] = userData;
    }
    console.log(userDataList);
    res.status(200).json(userDataList);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//본인 프로필 변경
router.post('/profile/update', isLoggendIn, async (req, res, next) => {
  try {
    const userUpdateData = req.body;
    const userData = await User.findOne({ where: { id: userUpdateData.id } });
    const profileData = await Profile.findOne({ where: { userId: userUpdateData.id } });
    console.log('userUpdateData', userUpdateData);
    if (profileData) {
      await Profile.update(
        {
          nickname: userUpdateData.profiles[0].nickname,
          job: userUpdateData.profiles[0].job,
          location: userUpdateData.profiles[0].location,
          profileImgUrl: userUpdateData.profiles[0].profileImgUrl,
          introduce: userUpdateData.profiles[0].introduce,
          instagramUrl: userUpdateData.profiles[0].instagramUrl,
          youtubeUrl: userUpdateData.profiles[0].youtubeUrl,
          facebookUrl: userUpdateData.profiles[0].facebookUrl,
          tweeterUrl: userUpdateData.profiles[0].tweeterUrl,
          etcUrl: userUpdateData.profiles[0].etcUrl,
        },
        {
          where: { userId: userData.dataValues.id },
        },
      );
    } else {
      await Profile.create({
        nickname: userUpdateData.profile.nickname,
        job: userUpdateData.profile.job,
        location: userUpdateData.profile.location,
        profileImgUrl: userUpdateData.profile.profileImgUrl,
        introduce: userUpdateData.profile.introduce,
        instagramUrl: userUpdateData.profile.instagramUrl,
        youtubeUrl: userUpdateData.profile.youtubeUrl,
        facebookUrl: userUpdateData.profile.facebookUrl,
        tweeterUrl: userUpdateData.profile.tweeterUrl,
        etcUrl: userUpdateData.profile.etcUrl,
        userId: userData.dataValues.id,
      });
    }

    await Information.destroy({ where: { userId: userData.dataValues.id } });
    for (let item of userUpdateData.informations) {
      await Information.create({
        title: item.title,
        startDate: item.startDate,
        endDate: item.endDate,
        position: item.position,
        detailContents: item.detailContents,
        informationUrl: item.informationUrl,
        type: item.type,
        userId: userData.dataValues.id,
      });
    }
    const updateUserData = await User.findOne({
      where: { id: userUpdateData.id },
      include: [
        {
          model: Profile,
        },
        {
          model: Information,
        },
      ],
    });
    res.status(200).json(updateUserData);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//본인 이용약관 업데이트
router.post('/agreement', isLoggendIn, async (req, res, next) => {
  try {
    const userUpdateAgreement = req.body;
    if (userUpdateAgreement.termOfService && userUpdateAgreement.personalInformation) {
      const userAgreement = await Agreement.findOne({ where: { userId: req.user.dataValues.id } });

      console.log('updateData: ', userUpdateAgreement);
      console.log('userValues: ', req.user.dataValues);
      console.log('prevData: ', userAgreement.dataValues);
      if (userAgreement) {
        await Agreement.update(
          {
            termOfService: userUpdateAgreement.termOfService,
            personalInformation: userUpdateAgreement.personalInformation,
            eventReceive: userUpdateAgreement.eventReceive,
          },
          { where: { id: userAgreement.dataValues.id } },
        );
      } else {
        await Agreement.create({
          ...userUpdateAgreement,
          userId: req.user.dataValues.id,
        });
      }
      res.status(200).json(true);
    } else {
      res.status(500).json('wrong value');
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//본인 이용약관 조회
router.get('/agreement', isLoggendIn, async (req, res, next) => {
  try {
    const userAgreement = await Agreement.findOne({ where: { userId: req.user.dataValues.id } });
    if (userAgreement) {
      if (userAgreement.dataValues.termOfService && userAgreement.dataValues.personalInformation) {
        res.status(200).json(true);
      } else {
        res.status(500).json('not agreement');
      }
    } else {
      res.status(500).json('not agreement');
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
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
