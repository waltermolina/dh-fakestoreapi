const mongoose = require('mongoose')
const schema = mongoose.Schema;
const Store = require('./store')

const productSchema = new schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: String,
    image: String,
    gallery: [String],
    category: String,
    mostwanted: {
        type: Boolean,
        default: false
    },
    stock: {
        type: Number,
        required: false,
        default:0,
    },
    store:{
        type:schema.Types.ObjectId,
        default:null,
        ref:Store,
        required:false
    },
})

module.exports = mongoose.model('product', productSchema)