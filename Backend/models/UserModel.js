const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Đảm bảo email là duy nhất
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: String, // Địa chỉ
    country: String, // Quốc gia
    city: String, // Thành phố
    birthdate: Date, // Ngày sinh
    gender: {
        type: String,
        enum: ["male", "female", "other"], // Giới hạn các giá trị
    },
    profilePicture: String, // URL hình ảnh đại diện
    role: {
        type: String,
        enum: ["customer", "consultant", "admin"],
        default: "customer",
    },
    createdAt: {
        type: Date,
        default: Date.now, // Tự động điền ngày tạo
    },
    updatedAt: {
        type: Date,
        default: Date.now, // Tự động điền ngày cập nhật
    },

});


module.exports = mongoose.model("User", userSchema);
