const mongoose = require("mongoose");

const UserDetailsScehma = new mongoose.Schema(
    {
        uname: String,
        email: String,
        phoneNo: String,
    },
    {
        collection: "UserInfo",
    }
);
mongoose.model("UserInfo", UserDetailsScehma);