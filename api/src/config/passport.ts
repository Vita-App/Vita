import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { GOOGLE_KEY, SERVER_URL } from './keys';
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

// TWITTER Strategy to Login as a user

// passport.use(
//   new TwitterStrategy(
//     {
//       consumerKey: TWITTER_KEY.consumerKey,
//       consumerSecret: TWITTER_KEY.consumerSecret,
//       callbackURL: `${SERVER_URL}/auth/twitter/redirect`,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const currentUserRows = await knex<OAUTH_TABLE>('oauth')
//           .select()
//           .where({ user_id: profile.id });
//         const currentUser = currentUserRows[0];

//         if (currentUser) {
//           done(null, currentUser);
//         } else {
//           const newUser = await knex<OAUTH_TABLE>('oauth')
//             .insert({
//               user_id: profile.id,
//               name: profile.displayName,
//               image_link: profile.photos ? profile.photos[0].value : '',
//               create_time: date,
//               oauth_provider: profile.provider,
//               access_token: accessToken,
//               refresh_token: refreshToken,
//             })
//             .returning('*');

//           done(null, newUser[0]);
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     },
//   ),
// );

// passport.use(
//   new GithubStrategy(
//     {
//       // options for github strategy
//       clientID: GITHUB_KEY.clientID,
//       clientSecret: GITHUB_KEY.clientSecret,
//       callbackURL: `${SERVER_URL}/auth/github/redirect`,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       // check if user already exists in our own db
//       try {
//         const currentUserRows = await knex<OAUTH_TABLE>('oauth')
//           .select()
//           .where({ user_id: profile.id });
//         const currentUser = currentUserRows[0];

//         if (currentUser) {
//           done(null, currentUser);
//         } else {
//           // if not, create user in our db
//           const newUser = await knex<OAUTH_TABLE>('oauth')
//             .insert({
//               user_id: profile.id,
//               name: profile.displayName,
//               image_link: profile.photos ? profile.photos[0].value : '',
//               create_time: date,
//               oauth_provider: profile.provider,
//               access_token: accessToken,
//               refresh_token: refreshToken,
//             })
//             .returning('*');

//           done(null, newUser[0]);
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     },
//   ),
// );
