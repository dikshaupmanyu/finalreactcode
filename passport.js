const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('./model/registerSchema')

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(

        // { usernameField: "email", passwordField: "googleId" },
        // function (email, password, done) {
        //   User.findOne({ email })
        //     .lean()
        //     .exec((err, user) => {
        //       if (err) {
        //         return done(err, null);
        //       }
      
        //       if (!user) {
        //         return done("No user found", null);
        //       }
      
        //       const isPasswordValid = password === user.googleId;
      
        //       if (!isPasswordValid) {
        //         return done("Google authentication failed", null);
        //       }
      
        //       return done(null, user);
        //     });
        // }
          {
            clientID: "604995091388-io13bqqg3g6sv6o70mjv3mh6gh2laev6.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: 'api/google-login',
          },
          async (accessToken, refreshToken, profile, done) => {
            console.log(profile)
            const newUser = {
              googleId: profile.id,
              displayName: profile.displayName,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              // image: profile.photos[0].value,
            }
    
            try {
              let user = await User.findOne({ googleId: profile.id })
    
              if (user) {
                done(null, user)
              } else {
                user = await User.create(newUser)
                done(null, user)
              }
            } catch (err) {
              console.error(err)
            }
          }
      )
      
    
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}