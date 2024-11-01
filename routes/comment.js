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
const newComment = new Comment(req.body)
const savedComment = await newComment.save()
res.status(200).json(savedComment)
} catch(err) {
res.status(500).json(err)
}
})

//update
router.put("/:id", verifyToken, async(req,res) => {
    try{
        const updateComment = await comment.findByIDAndUpdate(req.params.id,{$set:reqbody},{new:true})
res.status(200).json(updateComment)
    } catch(err) {
        res.status(500).json(err)
    }
})

//delete
router.delete("/:id", async(req,res) => {
    try{
await comment.findByIDAndDelete(req.params.id)
res.status(200).json("Comment deleted")
    } catch(err) {
        res.status(500)
    }
})

//get comment
router.get("/post/postId", async(req,res) => {
    try{
const comments = await comment.find({postId:req.params.postId})
res.status(200).json(comments)
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router
