const express = require("express");
const session = require("express-session");
const app = express();

app.use(
    session({
        secret: "thisisnotagoodsecret",
        resave: false,
        saveUninitialized: false,
    })
);

app.get("/viewcount", (req, res) => {
    if (req.session.count) {
        req.session.count += 1;
    } else {
        req.session.count = 1;
    }
    res.send(`YOU HAVE VIEWED THIS PAGE ${req.session.count} TIMES`);
});

app.get("/register", (req, res) => {
    const { username = "Anonymous" } = req.query;
    req.session.username = username;
    res.redirect("/greet");
});

app.get("/greet", (req, res) => {
    const { username } = req.session;
    res.send(`Welcome back, ${username}`);
});

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000");
});
