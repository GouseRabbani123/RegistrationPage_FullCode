const express = require('express');
const app = express();
const cors = require('cors');
require('./database/config');
const User = require('./database/User');
app.use(express.json());
app.use(cors());
app.post('/signup', async (req,res)=>{
  let user = new User(req.body)
  let result = await user.save();
  result = result.toObject()
  delete result.password;
  res.send(result)
})
//creating login API
app.post('/login',async (req,res)=>{
  if(req.body.password&& req.body.email){
    let user = await User.findOne(req.body).select('-password');
    if(user){
      res.send(user)
    }
    else{
      res.send({result:"No response found"})
    }

  }
  else{
    res.send({result:"No response Found"})
  }
})
app.listen(6600)