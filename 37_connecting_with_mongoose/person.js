const mongoose = require("mongoose");
mongoose
    .connect("mongodb://127.0.0.1:27017/shopApp")
    .then(() => {
        console.log("CONNECTION OPEN!");
    })
    .catch((err) => {
        console.log("ERROR!!!");
        console.log(err);
    });

const personSchema = mongoose.Schema({
    first: String,
    last: String,
});

personSchema.pre("save", async function () {
    this.first = "Yo";
    this.last = "MAMA";
    console.log("ABOUT TO SAVE!!!!");
});

personSchema.post("save", async function () {
    console.log("JUST SAVED!!!!");
});

const Person = mongoose.model("Person", personSchema);

personSchema.virtual("fullName").get(function () {
    return `${this.first} ${this.last}`;
});
