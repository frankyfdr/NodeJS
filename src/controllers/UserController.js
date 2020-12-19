const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports ={
    async login(req,res)
    {
        const login = await User.find({username: req.body.username})

        
        
        if( login != "")
        {  
            if(req.body.password == login[0].password)
            return res.json(login);
            else
            return res.json(false);
        }
        else
            return res.json(false);
    },

    async index(req,res) {
       
    const user = await User.find();
    return res.json(user);
    },

    async store(req,res) {
       
        const user = await User.create(req.body);
        console.log("New user");
        return res.json(user);
    }, 

    async update(req,res) {
        const update = await User.findOneAndUpdate(req.body.username,{sym: req.body.sym})
        return res.json(update);
    }
};
