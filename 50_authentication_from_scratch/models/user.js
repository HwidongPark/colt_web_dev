const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: ["true", "Username cannot be blank"],
    },
    password: {
        type: String,
        required: [true, "Password connot be blank"],
    },
});

userSchema.statics.findAndValidate = async function (username, password) {
    const foundUser = await this.findOne({ username });

    const isValid = await bcrypt.compare(password, foundUser.password);
    return isValid ? foundUser : false;
};

module.exports = mongoose.model("User", userSchema);
