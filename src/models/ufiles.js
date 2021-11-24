const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
    {
        filePath: String,
    },
    {
        timestamps: true,
    },
);

const File = mongoose.model('File', userSchema);
module.exports = File;