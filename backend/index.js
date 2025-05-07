import express from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import githubAuth, { githubRoutes } from "./auth/github.js";
import cors from "./corsConfig.js";
import ensureAuth from "./middleware/ensureAuth.js";
import MemoryStore from "memorystore";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;
const MemStore = MemoryStore(session);

app.use(session({
    store: new MemStore({ checkPeriod: 86400000 }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    proxy: true,
    cookie: {
        httpOnly: true,
        maxAge: 86400000,
        secure: true,
        sameSite: 'none',
        domain: process.env.NODE_ENV === 'production' 
            ? '.railway.app'
            : undefined
    },
}));

app.enable('trust proxy');
app.use(cors);
app.use(passport.initialize());
app.use(passport.session());

githubAuth(passport);

app.get("/", (req, res) => res.send("Servidor activo"));

app.use("/auth", githubRoutes);

app.get("/api/user", ensureAuth, (req, res) => {
    res.json(req.user);
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
