import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { GOOGLE_KEY, SERVER_URL } from '../config/keys';
import { UserModel } from '../Models/User';
import { UserModelType } from '../types';

passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user);
});

passport.deserializeUser(async (response: UserModelType, done) => {
  try {
    const user = await UserModel.find({
      user_id: response.user_id,
    });
    done(null, user);
  } catch (err) {
    console.error(err);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_KEY.clientID,
      clientSecret: GOOGLE_KEY.clientSecret,
      callbackURL: `${SERVER_URL}/auth/google/redirect`,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const currentUser = await UserModel.find({
          user_id: profile.id,
        });

        if (currentUser.length != 0) {
          done(undefined, currentUser);
        } else {
          console.log(profile);
          const newUser = await UserModel.create({
            user_id: profile.id,
            name: profile.displayName,
            image_link: profile.photos ? profile.photos[0].value : '',
            oauth_provider: profile.provider,
            access_token: accessToken,
            refresh_token: refreshToken,
            isMentor: req.query.state === 'true' ? true : false,
          });
          await newUser.save();
          done(undefined, newUser);
        }
      } catch (err) {
        console.error(err);
        done(err as Error);
      }
    },
  ),
);
