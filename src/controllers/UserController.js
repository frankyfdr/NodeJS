const bcrypt = require('bcrypt');
const saltRounds = 10;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const axios = require("axios");
module.exports ={



    async login(req,res)
    {
    	
        const login = await User.find({username: req.body.username})
  
        if(login != "")
        await bcrypt.compare(req.body.password, login[0].password, (err, resposta) => {
            if (err) {
              console.error(err)
             
              return
            }
            var result = {
            			"name":login[0].name,
            			"email":login[0].email,
            			"sym":login[0].sym,
            			"username":login[0].username,
                       
            		}
            if(resposta == true)
            res.json(result) //true or false
            else
            res.json(false);
          })
          else
        	res.json(3);
          
    },

    async index(req,res) {
       
    const user = await User.find(req.body.username);
	console.log(user);
    return res.json(user);
    },

    async store(req,res) {
    
    	const user = await User.find({username: req.body.username})
    	if(user == "")
    	{
    
	       await bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
		    if (err) {
		      console.error(err)
		      return
		    }
		    req.body.password = hash;
		    const user =  User.create(req.body);
		  
		    return res.json(true);
		  });
          }
          else
          	res.json(3);
    }, 

    async update(req,res) {
        const update = await User.findOneAndUpdate(req.body.username,{sym: req.body.sym})
        return res.json(update);
    }
};
