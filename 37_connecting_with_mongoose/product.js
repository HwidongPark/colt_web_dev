const mongoose = require("mongoose");

mongoose
    .connect("mongodb://127.0.0.1:27017/shopApp")
    .then(() => {
        console.log("CONNECTION OPEN!!!");
    })
    .catch((err) => {
        console.log("OH NO ERROR!!");
        console.log(err);
    });

// const productSchema = new mongoose.Schema({
//     name: String,
//     price: Number,
//     isOnSale: Boolean,
// });

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: [0, "음수 가격은 올 수 없다."],
    },
    isOnSale: {
        type: Boolean,
        default: false,
    },
    categories: {
        type: [String],
        default: ["Cycling", "Safety"],
    },
    qty: {
        onlne: {
            type: Number,
            default: 0,
        },
        inStore: {
            type: Number,
            default: 0,
        },
    },
    size: {
        type: String,
        enum: ["S", "M", "L"],
    },
});

// Instance Method
productSchema.methods.greet = function () {
    //mongoose 의 Instance method만들 때 주의해야할 점!! arrow function아닌 traditional function사용해야 한다

    console.log("HELLO! HI! HOWDY!!");
    console.log(` - from ${this.name}`); // this는 individual instance를 의미
};

productSchema.methods.toggleOnSale = function () {
    this.isOnSale = !this.isOnSale;
    return this.save(); // async이기 때문에.. console.log()찍어보려고
};

productSchema.methods.addCategory = function (newCat) {
    this.categories.push(newCat);
    return this.save();
};

// Static Method
productSchema.statics.fireSale = function () {
    return this.updateMany({}, { isOnSale: true, price: 0 });
};

productSchema.statics.findByName = function (name) {
    return this.find({ name: name });
};

const Product = mongoose.model("Product", productSchema);

const bike = new Product({
    name: "Cycling Jersey",
    price: 28.5,
    categories: ["Cycling"],
    size: "XS",
});

// bike.save()
//     .then((data) => {
//         console.log("IT WORKED!!");
//         console.log(data);
//     })
//     .catch((err) => {
//         console.log("OH NO ERROR!!");
//         console.log(err);
//     });

// Product.findOneAndUpdate(
//     { name: "Tire Pump" },
//     { price: -100 },
//     { new: true, runValidators: true }
// )
//     .then((data) => {
//         console.log("IT WORKED!!!");
//         console.log(data);
//     })
//     .catch((err) => {
//         console.log("ERROR!!");
//         console.log(err);
//     });

Product.find({ name: "Tire Pump" })
    .then((data) => {
        console.log(data);
    })
    .catch((err) => console.log(err));

// const findProduct = async () => {
//     const foundProduct = await Product.findOne({ name: "Tire Pump" });
//     foundProduct.onSale = !foundProduct.onSale;
//     foundProduct.save();
// };

// const findProduct = async () => {
//     const foundProduct = await Product.findOne({ name: "Tire Pump" });
//     console.log(foundProduct);
//     foundProduct.toggleOnSale().then((data) => {
//         console.log(foundProduct);
//     });
// };

const findProduct = async () => {
    const foundProduct = await Product.findOne({ name: "Tire Pump" });
    console.log(foundProduct);
    foundProduct.addCategory("new category입니다.").then((data) => {
        console.log(foundProduct);
    });
};

// Static Method
// Product.fireSale().then((res) => console.log(res));
Product.findByName("Tire Pump").then((res) => {
    console.log("찾은 결과");
    console.log(res);
});
