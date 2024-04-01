const express = require("express");
const app = express(); // express를 execute시킴

// app.use()는 request가 오면 어떤 request던 여기에 있는 call back이 실행되도록 함
// app.use((req, res) => {
//     console.log("WE GOT NEW REQUEST");

//     // res.send("HELLO WE GOT YOUR REQUEST! THIS IS YOUR RESPONSE");
//     // res.send({ color: "red" });
//     res.send("<h1>THIS IS MY WEBPAGE</h1>");
// });

app.get("/", (req, res) => {
    res.send("THIS IS THE HOME PAGE");
});

app.get("/cats", (req, res) => {
    res.send("CAT REQUEST!!!");
});

app.get("/dogs", (req, res) => {
    res.send("WOLFFFF!!");
});

// path parameters사용법
app.get("/r/:subreddit", (req, res) => {
    const { subreddit } = req.params; // path params 사용법
    res.send(`<h1>Browsing the ${subreddit}</h1>`);
});

app.get("/r/:subreddit/:postId", (req, res) => {
    const { subreddit, postId } = req.params;
    res.send(
        `<h1>Viewing Post Id: ${postId} on the subreddit ${subreddit}</h1>`
    );
});

// Query String 사용법
app.get("/search", (req, res) => {
    const { keyword, color } = req.query; // Query String을 가져옴

    if (!keyword) {
        res.send("NOTHING FOUND IF NOTHING SEARCHED"); // 검색어를 안 넣었을 경우
    }

    res.send(`<h1>Search result for: ${keyword}</h1>`);
});

// "*"는 모든 요청주소를 의미
// 얘는 항상 가장 마지막에 있어야 함
app.get("*", (req, res) => {
    res.send("I DON'T KNOW THAT PATH");
});

// port, call back 함수(웹 앱이 시작될 때 실행됨)
// 3000번 포트를 열어놔서 listen하겠다는 의미
app.listen(3000, () => {
    console.log("Server Started!");
});
