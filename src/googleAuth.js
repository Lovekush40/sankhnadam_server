import jwt from "jsonwebtoken";
import passport from "passport";

const FRONTEND_URL = "https://sankhnadam-frontend-qh5z.vercel.app";

// Callback after Google OAuth
const googleCallback = (req, res, next) => {
  passport.authenticate(
    "google",
    { session: false },
    async (err, user, info) => {

      console.log("ERROR:", err);
      console.log("USER:", user);
      console.log("INFO:", info);

      if (err || !user) {
        return res.redirect(`${FRONTEND_URL}/#/login`);
      }

      const token = user.generateAccessToken();
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