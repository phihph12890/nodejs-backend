import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
    category: {
        type: ObjectId,
        ref: "Category", 
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true,
        
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        
    },
    priceSale: {
        type: Number,
        required: true,
        
    },
    guarantee: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
    },
    config: {
        type: String,
        required: true,
        
    },
    description: {
        type: String,
        required: true,
        
    },
    sold: {
        type: Number,
        default: 0
    },
    shipping: {
        required: false,
        type: Boolean
    }
}, { timestamps: true })

module.exports = mongoose.model("Product", productSchema);