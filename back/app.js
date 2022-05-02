import express from 'express';
import userRouter from './routes/user';
import projectRouter from './routes/project';
import authRouter from './routes/auth';
import db, { User } from './models';
import cors from 'cors';
import passport from 'passport';
import passportConfig from './passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import morgan from 'morgan';
import hpp from 'hpp';
import helmet from 'helmet';
import favicon from 'serve-favicon';

dotenv.config();

const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log('db connect');
  })
  .catch(console.error);

passportConfig();

app.use(helmet());

app.use(
  cors({
    origin: [process.env.FRONT_URL, 'http://3.38.232.129', 'http://brmnmusic.com'],
    credentials: true,
  }),
);
app.use('/', express.static(path.join(__dirname, 'profileImages')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
  app.use(hpp());
} else {
  app.use(morgan('dev'));
}
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
      domain: process.env.NODE_ENV === 'production' && '.brmnmusic.com',
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));

app.use('/user', userRouter);
app.use('/project', projectRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.send('hello behint');
});

app.get('/naver/oauth', async function (req, res, next) {
  passport.authenticate('naver', async function (err, user) {
    console.log('passport.authenticate(naver)실행');
    if (!user) {
      return res.redirect(`${process.env.FRONT_URL}/signin/fail`);
    }
    req.logIn(user, async function () {
      console.log('naver/callback user : ', user);
      if (user === 'kakao') {
        return res.redirect(`${process.env.FRONT_URL}/signin/overlap`);
      }
      try {
        const userData = await User.findOne({
          where: { id: req.user.dataValues.id },
        });
        if (userData.agreement) {
          return res.redirect(`${process.env.FRONT_URL}/project`);
        }
        return res.redirect(`${process.env.FRONT_URL}/signin/agreements`);
      } catch (err) {
        console.error(err);
        next(err);
      }
    });
  })(req, res);
});

app.get('/kakao/oauth', async function (req, res, next) {
  console.log('kakao');
  passport.authenticate('kakao', async function (err, user) {
    console.log('passport.authenticate(kakao)실행');
    if (!user) {
      return res.redirect(`${process.env.FRONT_URL}/signin/fail`);
    }
    req.logIn(user, async function () {
      console.log('kakao/callback user : ', user);
      if (user === 'naver') {
        return res.redirect(`${process.env.FRONT_URL}/signin/overlap`);
      }
      try {
        const userData = await User.findOne({
          where: { id: req.user.dataValues.id },
        });
        if (userData.agreement) {
          return res.redirect(`${process.env.FRONT_URL}/project`);
        }
        return res.redirect(`${process.env.FRONT_URL}/signin/agreements`);
      } catch (err) {
        console.error(err);
        next(err);
      }
    });
  })(req, res);
});

app.listen(3095, '0.0.0.0', () => {
  console.log('server open');
});
