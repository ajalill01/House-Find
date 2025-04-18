const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title : {
        type : String,
        trim : true,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phoneNumber : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    googleMapLink : {
        type : String,
        required : true
    },
    type : {
        type : String,
        enum : ['sale','rent'],
        required : true
    },
    propertyType: {
        type: String,
        enum: ['apartment', 'house', 'villa', 'studio', 'land','garage'],
        required: true
    },    
    price : {
        type : Number,
        required : true
    },
    photos : [{
        url : {
            type : String,
            required : true
        },
        publicId : {
            type : String,
            required : true
        }
    }],
    postedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
},{timestamps : true})

module.exports = mongoose.model('Post',postSchema)