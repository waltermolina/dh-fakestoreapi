const mongoose = require('mongoose')
const schema = mongoose.Schema

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
    }
})

module.exports = mongoose.model('product', productSchema)