import express from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import githubAuth from "./auth/github.js";
import corsConfig from "./corsConfig.js";
import ensureAuth from "./middleware/ensureAuth.js";
import MemoryStore from "memorystore";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

const MemStore = MemoryStore(session);

app.use(session({
    cookie: { maxAge: 86400000 },
    store: new MemStore({
        checkPeriod: 86400000 
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

githubAuth(passport);

app.get("/", (req, res) => res.send("Servidor activo"));

app.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));

app.get("/auth/github/callback",
    passport.authenticate("github", {
        failureRedirect: "/login",
        successRedirect: `${process.env.FRONTEND_URL}/myaccount`,
    })
);

app.get("/auth/logout", (req, res) => {
    req.logout(() => {
        res.redirect(`${process.env.FRONTEND_URL}/`);
    });
});

app.get("/api/user", ensureAuth, (req, res) => {
    res.json(req.user);
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
