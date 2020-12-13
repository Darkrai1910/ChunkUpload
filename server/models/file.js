const mongoose = require('mongoose');
const Schema = mongoose.Schema
const fileSchema = new Schema({
    name:{
        type: String,
        unique:true
    },
    ext:{
        type:String
    },
    size:{
        type:Number
    },
    path:{
        type:String
    },
    isReady:{
        type:Boolean
    },
    isCorrupted:{
        type:Boolean
    }
})
module.exports = mongoose.model('file',fileSchema,'files')