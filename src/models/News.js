const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({ 
    sym: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: false,
    },
    mesage: {
        type: String,
        required: false,
    },
    date: {
        type: String,
        required: false,
    },
});
mongoose.model('News',NewsSchema);
