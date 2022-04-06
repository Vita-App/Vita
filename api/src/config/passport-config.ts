import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import LinkedinStrategy from 'passport-linkedin-oauth2';
import { GOOGLE_KEY, LINKEDIN_KEY } from './keys';
import { UserModel } from '../Models/User';

const createUserIfNotExists = async (
  user: any,
  done: GoogleStrategy.VerifyCallback,
) => {
  try {
    const currUser = await UserModel.findOne({ user_id: user.user_id });
    if (currUser) {
      done(null, currUser);
    } else {
      await user.save();
      done(null, user);
    }
  } catch (err: any) {
    done(err, undefined);
  }
};

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy.Strategy(
    { ...GOOGLE_KEY, passReqToCallback: true },
    (request, _accessToken, _refreshToken, profile, done) => {
      const user = new UserModel({
        user_id: profile.id,
        first_name: profile._json?.given_name,
        last_name: profile._json?.family_name,
        email: profile._json?.email,
        image_link: profile._json?.picture,
        oauth_provider: profile.provider,
        is_mentor: request.query.state === 'true' ? true : false,
      });

      createUserIfNotExists(user, done);
    },
  ),
);

passport.use(
  new LinkedinStrategy.Strategy(
    {
      ...LINKEDIN_KEY,
      scope: ['r_emailaddress', 'r_liteprofile'],
      passReqToCallback: true,
    },
    (request, _accessToken, _refreshToken, profile, done) => {
      const user = new UserModel({
        user_id: profile.id,
        first_name: profile.name?.givenName,
        last_name: profile.name?.familyName,
        email: profile.emails[0].value,
        image_link: profile._json?.profilePicture?.displayImage,
        oauth_provider: profile.provider,
        is_mentor: request.query.state === 'true' ? true : false,
      });

      createUserIfNotExists(user, done);
    },
  ),
);
