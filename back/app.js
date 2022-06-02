const express = require('express');
const userRouter = require('./routes/user');
const projectRouter = require('./routes/project');
const authRouter = require('./routes/auth');
const db = require('./models');
const cors = require('cors');
const passport = require('passport');
const passportConfig = require('./passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');
const hpp = require('hpp');
const helmet = require('helmet');
const favicon = require('serve-favicon');
const { User, Agreement } = require('./models');

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
    if (!user) {
      return res.redirect(`${process.env.FRONT_URL}/signin/fail`);
    }
    req.logIn(user, async function () {
      if (user === 'kakao') {
        return res.redirect(`${process.env.FRONT_URL}/signin/overlap`);
      }
      try {
        const agreements = await Agreement.findOne({
          where: { userId: req.user.dataValues.id },
        });
        if (agreements.dataValues.termOfService && agreements.dataValues.personalInformation) {
          return res.redirect(`${process.env.FRONT_URL}`);
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
  passport.authenticate('kakao', async function (err, user) {
    if (!user) {
      return res.redirect(`${process.env.FRONT_URL}/signin/fail`);
    }
    req.logIn(user, async function () {
      if (user === 'naver') {
        return res.redirect(`${process.env.FRONT_URL}/signin/overlap`);
      }
      try {
        const agreements = await Agreement.findOne({
          where: { userId: req.user.dataValues.id },
        });
        if (agreements.dataValues.termOfService && agreements.dataValues.personalInformation) {
          return res.redirect(`${process.env.FRONT_URL}`);
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
