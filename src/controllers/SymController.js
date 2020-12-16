const mongoose = require('mongoose');

const Sym = mongoose.model('Sym');

module.exports ={
    async index(req,res) {
    const sym = await Sym.find();
    return res.json(sym);
    },

    async store(req,res) {
        const Sym = Sym.create(req.body);
    }
};