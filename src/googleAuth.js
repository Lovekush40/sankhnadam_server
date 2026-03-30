import jwt from "jsonwebtoken";
import passport from "passport";

const googleCallback = (req, res, next) => {
  passport.authenticate(
    "google",
    { session: false },
    async (err, user) => {
      if (err || !user) return res.redirect("http://localhost:5173/login");

      const token = user.generateAccessToken();

      // Send token as URL parameter so frontend can read it
      return res.redirect(`http://localhost:5173/success?token=${token}`);
    }
  )(req, res, next);
};

const googleLogin = (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })(req, res, next);
};

export {googleLogin, googleCallback}