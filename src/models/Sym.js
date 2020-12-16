const mongoose = require('mongoose');

const SymSchema = new mongoose.Schema({ 
    sym: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    summary: {
        type: Number,
        required: false,
    },
    finance: {
        type: Number,
        required: false,
    },
});
mongoose.model('Sym',SymSchema);
