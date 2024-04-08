const express = require("express");
const app = express();

const User = require("./models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const session = require("express-session");

mongoose
    .connect("mongodb://localhost:27017/authDemo")
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!");
    })
    .catch((err) => {
        console.log("에러 발생!!");
        console.log(err);
    });

app.set("view engine", "ejs");
app.set("views", "views");

const requiredLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect("/login");
    }

    next();
};

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "notagoodsecret" }));

app.get("/", (req, res) => {
    res.send("THIS IS HOME PAGE");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", async (req, res) => {
    const { password, username } = req.body;
    const hash = await bcrypt.hash(password, 12);

    const user = new User({
        username,
        password: hash,
    });

    await user.save();
    req.session.user_id = user._id; // .save()하면서 저절로 필드가 추가되나봄!
    return res.redirect("/");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    const validPassword = await bcrypt.compare(password, user.password);
    console.log(`validPassword=${validPassword}`);
    console.log(user);
    if (validPassword) {
        req.session.user_id = user._id;
        console.log(`req.session.user_id = ${req.session.user_id}`);
        return res.send("YAY WELCOME!");
    } else {
        return res.send("TRY AGAIN");
    }
});

app.post("/logout", (req, res) => {
    req.session.user_id = null; // 걍 null로 바꿔주면 로그아웃 됨
    res.redirect("/login");
});

app.get("/secret", requiredLogin, (req, res) => {
    res.render("secret");
});

app.listen(3000, () => {
    console.log("SERVING YOUR APP");
});
