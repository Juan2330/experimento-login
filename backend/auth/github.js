import express from "express";
import passport from "passport";
import githubAuth from "./github.js"; 
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
githubAuth(passport);

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get("/github/callback",
    passport.authenticate("github", { failureRedirect: "/" }),
    (req, res) => {
        res.redirect(`${process.env.FRONTEND_URL}/myaccount`);
    }
);

app.get("/auth/logout", (req, res, next) => {
    req.logout(err => {
        if (err) return next(err);
        res.redirect(`${process.env.FRONTEND_URL}/`);
    });
});

export default router;
