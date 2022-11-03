const express = require("express")
const router = express.Router()

//two dots because we need to go one level up
const Post = require("../models/Post")

//Post (Create data)
router.post("/", async(req,res) => {
    //console.log(req.body)

    const postData = new Post({
        user:req.body.user,
        title:req.body.title,
        text:req.body.text,
        hashtag:req.body.hashtag,
        location:req.body.location,
        url:req.body.url
    })
    //always try in case of error
    try{
        //have to wait for data, then save contents, then send it back
        const postToSave = await postData.save()
        res.send(postToSave)
    }catch(err){
        //send reply as a JSON message
        res.send({message:err})
    }
})

//Get1 (Read)
router.get("/", async(req,res) => {
    try{
        const getPosts = await Post.find()
        res.send(getPosts)
    }catch(err){
        //send reply as a JSON message
        res.send({message:err})
    }
})

//Get2 (Read)
router.get("/:postID", async(req,res) => {
    try{
        //postID is param user provides, becomes the end of the url
        const getPostByID = await Post.findById(req.params.postID)
        res.send(getPostByID)
    }catch(err){
        //send reply as a JSON message
        res.send({message:err})
    }
})

//PATCH (Update)
router.patch("/:postID", async(req,res) => {
    //always try in case of error
    try{
        //have to wait for data, then save contents, then send it back
        const updatetPostByID = await Post.updateOne(
            //first find record that has this ID, then update everything with new data
            {_id:req.params.postID},
            {$set:{
                user:req.body.user,
                title:req.body.title,
                text:req.body.text,
                hashtag:req.body.hashtag,
                location:req.body.location,
                url:req.body.url
                }
            }
        )
        res.send(updatetPostByID)
    }catch(err){
        //send reply as a JSON message
        res.send({message:err})
    }
})

//DELETE (delete)
router.delete("/:postID", async(req,res) => {
    try{
        //have to wait for data, then save contents, then send it back
        const deletetPostByID = await Post.deleteOne({_id:req.params.postID})
            res.send(deletetPostByID)
        }catch(err){
            res.send({message:err})
        }
})

module.exports = router