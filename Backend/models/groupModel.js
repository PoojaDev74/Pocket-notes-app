const mongoose = require("mongoose");

const groupSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    initial:{
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    }
},
{timestamp: true},
);

const group = new mongoose.model("group", groupSchema);

module.exports = group;
