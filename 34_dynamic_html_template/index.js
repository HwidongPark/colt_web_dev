const express = require("express");
const app = express();
const path = require("path"); // Express에 있는 module..

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views")); // __dirname은 "index.js가 있는 위치"임.

app.get("/", (req, res) => {
    // res.send("HI");
    res.render("home");
});

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000");
});
