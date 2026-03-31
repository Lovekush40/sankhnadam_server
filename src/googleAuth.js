import jwt from "jsonwebtoken";
import passport from "passport";

const FRONTEND_URL = "https://sankhnadam-frontend.onrender.com";

// Callback after Google OAuth
const googleCallback = (req, res, next) => {
  passport.authenticate(
    "google",
    { session: false },
    async (err, user) => {
      if (err || !user) {
        // Redirect to login if error or no user
        return res.redirect(`${FRONTEND_URL}/#/login`);
      }

      // Generate JWT token
      const token = user.generateAccessToken();

      // Redirect to frontend login page with token in URL hash query
      // This works with React Router hash routing (#/)
      return res.redirect(`${FRONTEND_URL}/#/login?token=${token}`);
    }
  )(req, res, next);
};

// Trigger Google OAuth login
const googleLogin = (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })(req, res, next);
};

export { googleLogin, googleCallback };