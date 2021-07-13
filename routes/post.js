const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

// get all posts
router.get('/', async (req,res) => {
    try{
        const post = await Post.find()
        res.json(post)
    } catch(err) {
        res.json({message: err})
    }
})

// add new post
router.post('/', async (req, res) => {
    console.log('Save to MongDb');
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })

    try{
        const savePost = await post.save()
        res.json(savePost)
    } catch (err) {
        res.json({message: err})
    }
})

//get a specific posts 
router.get('/:postId', async (req,res) => {
    try{
        const post = await Post.findById(req.params.postId)
        res.json(post)
    } catch (err) {
        res.json({message: err})
    }
})

//delete post
router.delete('/:postId', async (req,res) => {
    try{
        const removePost = await Post.remove({_id: req.params.postId})
        res.json(post)
    } catch (err) {
        res.json({message: err})
    }
})

//update a specific post
router.patch('/:postId', async (req,res) => {
    try{
        const updatePosts = await Post.updateOne(
            { _id: req.params.postId},
            { $set: { title: req.body.title }}
        )
        res.json(updatePosts)
    } catch (err) {
        res.json({message: err})
    }
})

module.exports = router