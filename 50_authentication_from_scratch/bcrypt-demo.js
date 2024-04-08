const bcrypt = require("bcrypt");

// 방법 1
const hashPassword = async (pw) => {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(pw, salt);
    console.log(salt);
    console.log(hash);
};

// 방법2
// const hashPassword = async (pw) => {
//     const hash = await bcrypt.hash(pw, 12); // salt가 아니라 그냥 numberOfRound만 넣어줌
//     console.log(salt);
//     console.log(hash);
// };

const login = async (pw, hashedPw) => {
    const result = bcrypt.compare(pw, hashedPw);
    if (result) {
        console.log("LOGGED YOU IN! SUCCESSFUL MATCH!");
    } else {
        console.log("INCORRECT");
    }
};

hashPassword("monkey");
// login("monkey", "$2b$10$6ecVORPrmRVb90OfPjlZq.3IHBmE3o8i0bu7NvEB.uWiQ115PWbZe");
