const mongoose = require('mongoose');

const FinanceSchema = new mongoose.Schema({ 
    sym: {
        type: String,
        required: true,
    },
    eps: {
        type: Number,
        required: false,
    },
    quickRatio: {
        type: Number,
        required: false,
    },
    pe: {
        type: Number,
        required: false,
    },
});
mongoose.model('Finance',FinanceSchema);
