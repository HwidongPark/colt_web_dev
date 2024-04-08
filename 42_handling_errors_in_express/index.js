const express = require("express");
const app = express();

const morgan = require("morgan");

// morgan("tiny");

// app.use(morgan("tiny"));

// app.use((req, res, next) => {
//     console.log("This is my first Middleware!!");
//     return next();
//     console.log("THIS IS FIRST MIDDLEWARE - AFTER CALLING NEXT()");
// });

// app.use((req, res, next) => {
//     console.log("THIS IS MY SECOND MIDDLEWARE");
//     return next();
// });

app.use(morgan("dev"));

app.use((req, res, next) => {
    req.requestTime = Date.now();
    next();
});

app.use("/dogs", (req, res, next) => {
    console.log("I LOVE DOGS!!!");
    next();
});

const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === "chickennugget") {
        next();
    }

    // res.send("SORRY YOU NEED A PASSWORD");

    throw new Error("Password required!");
};

app.use((req, res, next) => {
    // req.method = "GET";
    console.log(req.method.toUpperCase(), req.path);
    next();
});

app.get("/", (req, res) => {
    console.log(`Request Date: ${req.requestTime}`);
    res.send("Home Page!");
});

app.get("/dogs", (req, res) => {
    console.log(`Request Date: ${req.requestTime}`);
    res.send("WOOF WOOF");
});

app.get("/error", (req, res) => {
    chicken.fly();
});

app.get("/secret", verifyPassword, (req, res) => {
    res.send("THIS IS SECRET PAGE");
});

app.use((req, res) => {
    // 404처리 위해서.. -> 그래서 가장 마지막줄에 넣음
    res.status(404).send("NOT FOUND");
});

app.listen(3000, () => {
    console.log("3000번 포트에서 연결 완료!!!");
});
