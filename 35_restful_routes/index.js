const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuid } = require("uuid"); // alias로 v4로 가져오는게 아니라 uuid로 alias한 것임

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method")); // 아규먼트로 '_method' 를 넣어줌
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// 데이터베이스처럼 하기위해...
const comments = [
    {
        id: uuid(),
        username: "Todd",
        comment: "lol that is so funny!",
    },
    {
        id: uuid(),
        username: "Skyler",
        comment: "I like to go birdwatching with my dog",
    },
    {
        id: uuid(),
        username: "Sk8e4Boi",
        comment: "Plz delete your account, Todd",
    },
    {
        id: uuid(),
        username: "onlysayswoof",
        comment: "woof woof woof",
    },
];

// REST API만드는 예제
app.get("/comments", (req, res) => {
    res.render("comments/index", { comments });
});

app.get("/comments/new", (req, res) => {
    res.render("comments/new");
});

app.get("/comments/:id/edit", (req, res) => {
    const { id } = req.params;
    console.log(`id=${id}`);

    const comment = comments.find((c) => c.id == id);
    console.log(`comment = ${comment}`);
    res.render("comments/edit", { comment });
});

app.post("/comments", (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() });
    // res.send("IT WORKED!");

    res.redirect("/comments");
});

app.get("/comments/:id", (req, res) => {
    const { id } = req.params;
    const comment = comments.find((c) => c.id === id);
    res.render("comments/show", { comment });
});

app.patch("/comments/:id", (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;

    const foundComment = comments.find((c) => c.id == id);
    foundComment.comment = newCommentText;
    res.redirect("/comments");
});

// GET, POST설명 예제
app.get("/tacos", (req, res) => {
    res.send("GET /tacos response");
});

app.post("/tacos", (req, res) => {
    console.log(req.body);
    res.send("POST /tacos response");
});

app.listen(3000, () => {
    console.log("ON PORT 3000");
});
