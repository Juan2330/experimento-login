import { Strategy as GitHubStrategy } from "passport-github2";
import dotenv from "dotenv";
import express from "express";
import passport from "passport";

dotenv.config();

const router = express.Router();

export default function githubAuth(passport) {
    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK,
    }, (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
    }));

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((obj, done) => {
        done(null, obj);
    });
}

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get("/github/callback",
    passport.authenticate("github", { failureRedirect: "/" }),
    (req, res) => {
        res.redirect(`${process.env.FRONTEND_URL}/myaccount`);
    }
);

router.get("/logout", (req, res, next) => {
    req.logout(err => {
        if (err) return next(err);
        res.redirect(`${process.env.FRONTEND_URL}/`);
    });
});

export { router as githubRoutes };
