const mongoose = require('mongoose')
const schema = mongoose.Schema

const storeSchema = new schema({
    email:{
        type:String,
        required:false
    },
    name:{
        type:String,
        required:true
    },
    logo: {
        type:String,
        required:false,
        default:null
    },
    address:{
        city:String,
        street:String,
        number:Number,
        zipcode:String,
        geolocation:{
            lat:String,
            long:String
        }
    },
    phone:String
})

module.exports = mongoose.model('store',storeSchema)