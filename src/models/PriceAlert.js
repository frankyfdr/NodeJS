const mongoose = require('mongoose');

const PriceAlertSchema = new mongoose.Schema({ 
    sym: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});
mongoose.model('PriceAlert',PriceAlertSchema);
