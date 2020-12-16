const mongoose = require('mongoose');

const SummarySchema = new mongoose.Schema({ 
    sym: {
        type: String,
        required: true,
    },
    exchange: {
        type: String,
        required: false,
    },
    industry: {
        type: String,
        required: false,
    },
});
mongoose.model('Summary',SummarySchema);
