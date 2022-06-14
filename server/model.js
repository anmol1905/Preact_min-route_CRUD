const mongoose = require('mongoose')
var studentSchema = new mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    admissionId:{
        type:String
    }
});
mongoose.model('Student',studentSchema)