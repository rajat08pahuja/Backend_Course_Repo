const mongoose = require('mongoose');


const planSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    name: {
        type: String,
    },
    ratings: {
        type: Number,
        min: 0,
        max: 10
    },
    price: {
        type: Number
    },
    delivery: {
        type: Boolean
    },
    meals: {
        type: Number
    },
    description: {
        type: String
    }
})