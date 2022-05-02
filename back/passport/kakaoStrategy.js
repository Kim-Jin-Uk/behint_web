import passport from 'passport';
import { Strategy as KakaoStrategy } from 'passport-kakao';
import { User } from '../models';
import dotenv from 'dotenv';
dotenv.config();

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_API_KEY,
        callbackURL: 'http://localhost:3095/kakao/oauth',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          if (profile._json.kakao_account.email === undefined) {
            done('error!!!!!!!!!!!!!!!!', 'error!!!!!!!!!');
          } else {
            const naverUser = await User.findOne({
              where: {
                email: profile._json.kakao_account.email,
                provider: 'naver',
              },
            });
            if (naverUser) {
              done(null, 'naver');
            } else {
              const exUser = await User.findOne({
                where: {
                  email: profile._json.kakao_account.email,
                  provider: 'kakao',
                },
              });
              if (exUser) {
                done(null, exUser);
              } else {
                const newUser = await User.create({
                  email: profile._json && profile._json.kakao_account.email,
                  provider: 'kakao',
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
