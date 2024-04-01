const fs = require("fs");

const foldername = process.argv[2] || "Project";

// Create ./tmp/a/apple, regardless of whether ./tmp and ./tmp/a exist.
// fs.mkdir("Dogs", { recursive: true }, (err) => {
//     // 이 callback은 async가 끝나면 call됨
//     console.log("IN THE CALLBACK!!!");
//     if (err) throw err;
// });

// console.log("I COME AFTER MKDIR!!");

try {
    fs.mkdirSync(foldername);
    fs.writeFileSync(`${foldername}/index.html`, "");
    fs.writeFileSync(`${foldername}/app.js`, "");
    fs.writeFileSync(`${foldername}/app.css`, "");
} catch (e) {
    console.log("SOMETHING WENT WRONG!!!");
    console.log(e);
}
