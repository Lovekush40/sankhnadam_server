import jwt from "jsonwebtoken";
import passport from "passport";

const FRONTEND_URL = "https://sankhnadam-frontend.onrender.com";

const googleCallback = (req, res, next) => {
  passport.authenticate(
    "google",
    { session: false },
    async (err, user) => {
      if (err || !user) {
        return res.redirect(`${FRONTEND_URL}/login`);
      }

      const token = user.generateAccessToken();

      // Redirect to deployed frontend
      return res.redirect(`${FRONTEND_URL}/success?token=${token}`);
    }
  )(req, res, next);
};

const googleLogin = (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })(req, res, next);
};

export { googleLogin, googleCallback };