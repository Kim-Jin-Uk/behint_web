import passport from 'passport';
import { Strategy as NaverStrategy } from 'passport-naver-v2';
import { User } from '../models';
import dotenv from 'dotenv';
dotenv.config();

module.exports = () => {
  passport.use(
    new NaverStrategy(
      {
        clientID: process.env.NAVER_API_KEY,
        clientSecret: process.env.NAVER_API_SECRET_KEY,
        callbackURL: 'http://localhost:3095/naver/oauth',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          if (profile.email === undefined) {
            done('error!!!!!!!!!!!!!!!!', 'error!!!!!!!!!');
          } else {
            const kakaoUser = await User.findOne({
              where: { email: profile.email, provider: 'kakao' },
            });
            if (kakaoUser) {
              done(null, 'kakao');
            } else {
              const exUser = await User.findOne({
                where: { email: profile.email, provider: 'naver' },
              });
              if (exUser) {
                done(null, exUser);
              } else {
                const newUser = await User.create({
                  email: profile.email,
                  provider: 'naver',
                });
                done(null, newUser);
              }
            }
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      },
    ),
  );
};
