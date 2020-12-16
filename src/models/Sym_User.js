const mongoose = require('mongoose');

const Sym_UserSchema = new mongoose.Schema({ 
    sym: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: false,
    }
});
mongoose.model('Sym_User',Sym_UserSchema);
