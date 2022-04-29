const express = require('express')
const multer = require('multer')
const path = require("path");
const fs = require("fs");
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')

const router = express.Router()

try{
    fs.accessSync('profileImages')
}catch (e) {
    fs.mkdirSync('profileImages')
}
AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region:'ap-northeast-2'
})
const upload = multer({
    storage: multerS3({
        s3: new AWS.S3(),
        bucket: 'brmnmusic-image-s3',
        key(req, file, cb){
            cb(null,`profile/${Date.now()}_${path.basename(file.originalname)}`)
        }
    }),
    limits:{fileSize:20*1024*1024},
})



module.exports = router

