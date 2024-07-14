import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import LinkedinStrategy from 'passport-linkedin-oauth2';
import {
  CREATE_CALENDER_EMAIL,
  FEATURE_FLAGS,
  GOOGLE_KEY,
  LINKEDIN_KEY,
} from './keys';
import { UserModel } from '../Models/User';
import { Waitlist } from '../Models/Waitlist';
import { CalendarCredentialsModel } from '../Models/CalendarCredentials';

const calendarEventCreationEmail = async (
  email: any,
  refresh_token: string,
  done: GoogleStrategy.VerifyCallback,
) => {
  if (email !== CREATE_CALENDER_EMAIL) return done('Invalid email');

  if (!refresh_token) {
    return done('Could not get refresh token');
  }

  const currCredentials: any = await CalendarCredentialsModel.findOne({
    email,
  });

  if (!currCredentials) {
    const newCalenderCredential = new CalendarCredentialsModel({
      email,
      refresh_token,
    });
    await newCalenderCredential.save();
    return done(null, newCalenderCredential);
  }

  // Refresh token updated
  currCredentials.refresh_token = refresh_token;
  await currCredentials.save();
  return done(null, currCredentials);
};

const createUserIfNotExists = async (
  user: any,
  loginMode: string,
  done: GoogleStrategy.VerifyCallback,
) => {
  try {
    const currUser = await UserModel.findOne({ email: user.email });

    if (loginMode === 'true') {
      if (currUser) return done(null, currUser);

      return done('Email is not registered, please sign up first!');
    }

    if (loginMode === 'false') {
      if (currUser) return done('Email already registered');

      if (
        !user.is_mentor &&
        !/^[A-Za-z0-9._%+-]+@thapar.edu$/i.test(user.email)
      ) {
        return done('Mentee must use thapar.edu email');
      }

      await user.save();
      return done(null, user);
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
    async (request, _accessToken, _refreshToken, profile, done) => {
      const state = JSON.parse((request.query.state as string) || '{}');

      if (state.message === 'getRefreshToken') {
        calendarEventCreationEmail(profile._json.email, _refreshToken, done);
      } else {
        if (
          state.loginMode === 'false' &&
          state.isMentor === 'false' &&
          FEATURE_FLAGS.waitlist
        ) {
          const invite = await Waitlist.findOne({
            inviteCode: state.inviteCode,
          });

          if (
            !invite ||
            (invite.email !== profile._json.email && invite.email !== '*')
          ) {
            return done('Invalid invite code');
          }

          if (invite.email === profile._json.email) {
            await invite.remove();
          }
        }

        const user = new UserModel({
          user_id: profile.id,
          first_name: profile._json?.given_name,
          last_name: profile._json?.family_name,
          email: profile._json?.email,
          avatar: {
            filename: 'default',
            url: profile._json?.picture?.replace('?sz=96', ''),
          },
          oauth_provider: profile.provider,
          is_mentor: state.isMentor === 'true',
          verified: true,
        });

        createUserIfNotExists(user, state.loginMode, done);
      }
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
    async (request, _accessToken, _refreshToken, profile, done) => {
      const state = JSON.parse((request.query.state as string) || '{}');

      if (
        state.loginMode === 'false' &&
        state.isMentor === 'false' &&
        FEATURE_FLAGS.waitlist
      ) {
        const invite = await Waitlist.findOne({
          inviteCode: state.inviteCode,
        });

        if (
          !invite ||
          (invite.email !== profile.emails[0]?.value && invite.email !== '*')
        ) {
          return done('Invalid invite code');
        }

        if (invite.email === profile.emails[0]?.value) {
          await invite.remove();
        }
      }

      const user = new UserModel({
        user_id: profile.id,
        first_name: profile.name?.givenName,
        last_name: profile.name?.familyName,
        email: profile.emails[0].value,
        avatar: {
          filename: 'default',
          url: profile._json.profilePicture['displayImage~'].elements[0]
            .identifiers[0].identifier,
        },
        oauth_provider: profile.provider,
        is_mentor: state.isMentor === 'true',
        verified: true,
      });

      createUserIfNotExists(user, state.loginMode, done);
    },
  ),
);
