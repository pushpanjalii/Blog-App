const express = require('express')
const router = express.Router();
const newLocal = '../models/User.js';
const User = require(newLocal)
const bcrypt = require('bcrypt')
const post = require('../models/Post.js')
const comment = require('../models/Comment.js')
const verifyToken = require('../verifyToken.js')

//create
router.post("/create", verifyToken,async(req,res) => {
try{
    console.log(req.body);
const newPost = new post(req.body)
console.log(newPost);
const savedPost = await newPost.save()
console.log(savedPost);
res.status(200).json(savedPost)
} catch(err) {
res.status(500).json(err)
}
})

//update
router.put("/:id", verifyToken, async(req,res) => {
    try{
        const updatePost = await post.findByIDAndUpdate(req.params.id,{$set:reqbody},{new:true})
res.status(200).json(updatePost)
    } catch(er) {
        res.status(500).json(err)
    }
})

//delete
router.delete("/:id", async(req,res) => {
    try{
await post.findByIDAndDelete(req.params.id)
await comment.deleteMany({postId:req.params.postId})
res.status(200).json("Post deleted")
    } catch(err) {
        res.status(500)
    }
})

//get post details
router.get("/:id", async(req,res) => {
    try{
const post = await this.post.findByIDAnd(req.params.id)
res.status(200).json(post)
    } catch(err) {
        res.status(500).json(err)
    }
})

//get post
router.get("/", async(req,res) => {
    try{
const searchFilter = {
    title:{$regex:express.query.search, $options:"i"}
}
const posts = await post.find(express.query.search?
searchFilter:null)
res.status(200).json(posts)
    } catch(err) {
        res.status(500).json(err)
    }
})

//get user post
router.get("/user/:userId", async(req,res) => {
    try{
const posts = await post.find({userId:req.params.userId})
res.status(200).json(posts)
    } catch(err) {
        res.status(err).json(err)
    }
})




module.exports = router