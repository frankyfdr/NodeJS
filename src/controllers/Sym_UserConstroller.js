const mongoose = require('mongoose');

const Sym_User = mongoose.model('Sym_User');

module.exports ={
    async index(req,res) {
        const sym_user = await Sym_User.find();
        return res.json(sym_user);
    },

    async store(req,res) {
        const sym_user = Sym_User.create(req.body);
        return res.json(sym_user)
    }
};