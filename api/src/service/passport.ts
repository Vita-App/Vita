import { PassportStatic } from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { GOOGLE_KEY, SERVER_URL } from '../config/keys';
import { UserModel } from '../Models/User';
import { UserSchemaType } from '../types';
import Express from 'express';

const passportService = (passport: PassportStatic) => {
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
          const currentUser = await UserModel.findOne({
            user_id: profile.id,
          });
          if (currentUser) {
            done(null, currentUser);
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
            done(null, newUser);
          }
        } catch (err) {
          console.error(err);
          done(err as Error);
        }
      },
    ),
  );

  passport.serializeUser((user, done) => {
    console.log('insider serialize');
    //@ts-ignore
    console.log(user.id);
    //@ts-ignore
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      console.log('inside deserialize');
      console.log(id);
      const user = await UserModel.find({
        user_id: id,
      });
      console.log(user);
      done(null, user);
    } catch (err) {
      console.error(err);
    }
  });
};

export default passportService;
