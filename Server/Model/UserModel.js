const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    password: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }


});

module.exports = mongoose.model("User", UserSchema);
