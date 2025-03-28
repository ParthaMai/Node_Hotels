const mongoose=require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true 
    },
    price: {
        type: Number,
        require: true 
    },
    taste: {
        type: String,
        enum: ['sweet', 'spicy', 'sour'],
        require: true 
    },
    is_drink: {
        type: Boolean,
        default : false // if drink is not enter then by default it is false
    },
    ingredients: {
        type: [String],
        default:[]
    },
    num_sales: {
        type: Number,
        default: 0
    }
});

const menu=mongoose.model('menu',menuSchema);
module.exports=menu;