const express = require('express')
const router = express.Router();
const newLocal = '../models/User.js';
const User = require(newLocal)
const bcrypt = require('bcrypt')
const post = require('../models/post.js')
const comment = require('../models/comment.js')
const verifyToken = require('../verifyToken.js')

//create
router.post("/create", verifyToken,async(req,res) => {
try{
    console.log(req.body);
const newComment = new comment(req.body)

const savedComment = await newComment.save()
res.status(200).json(savedComment)
} catch(err) {
res.status(500).json(err)
}
})

//update
router.put("/:id", verifyToken, async(req,res) => {
    try{
        const updateComment = await comment.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        console.log(req.params.id);
res.status(200).json(updateComment)
    } catch(err) {
        res.status(500).json(err)
    }
})

//delete
router.delete("/:id", async(req,res) => {
    try{
await comment.findByIdAndDelete(req.params.id)
res.status(200).json("Comment deleted")
    } catch(err) {
        res.status(500)
    }
})

//get comment
router.get("/:id", async(req,res) => {
    try{
const comments = await comment.findById(req.params.id)
console.log(req.params.id);
res.status(200).json(comments)
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router
