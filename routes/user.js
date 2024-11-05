const express = require('express')
const router = express.Router();
const User = require('../models/User.js')
const bcrypt = require('bcrypt')
const post = require('./post.js')
const comment = require('./comment.js')
const verifyToken = require('../verifyToken.js')

//UPDATE
router.put("/:id", verifyToken, async(req,res) => {
    try{
      if(req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hashSync(req.body.password, salt);

      }
      const updateduserr = await User.findByIdAndUpdate(req.params.id,
          {$set: req.body},
          {new: true}
      );
      res.status(200).json(updateduserr)
    } catch(err) {
       res.status(500).json(err)
    }
});

//DELETE

router.delete("/:id", verifyToken, async(req,res) => {
    try{
      console.log(req.params.id);
      await User.findByIdAndDelete(req.params.id)
      console.log("user delete");
      await post.deleteMany({userId:req.params.id})
      console.log("post delete");
      await comment.deleteMany({userId:req.params.id})
      console.log("comment delete");
      res.status(200).json("user deleted successfully !!")
    } catch(err) {
         res.status(500).json(err)
    }
})

//Get User
router.get("/:id", async(req,res) => {
    try{
const users = await User.findById(req.params.id)
const {password, ...info} = User._doc
res.status(200).json(users)
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router