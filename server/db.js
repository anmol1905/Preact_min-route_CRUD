const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/School',{useNewUrlParser:true},(err)=>{
    if (!err){console.log('MongoDB connected!')}
    else{console.log('Error in DB connection: '+err)}
});

require('./model')