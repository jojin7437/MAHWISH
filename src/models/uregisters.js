const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new mongoose.Schema({

    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    
    email : {
        type : String,
        required : true,
        unique : true
    },
    phone : {
        type : Number,
        required : true,
        unique : true
    },
    city : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    confirmpassword : {
        type : String,
        required : true
    }
})

const Register = mongoose.model("Register", employeeSchema);

module.exports = Register;

