const { response } = require('express')
const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const Post = require('../models/Post')

// get all posts
router.get('/', async (req,res) => {
    try{
        const post = await Post.find()
        res.status(200).json({status: '200', result: post})
    } catch(err) {
        res.status(400).json({status: '400', result: [], message: err})
    }
})

// add new post
router.post('/', body('email').isEmail(), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        email: req.body.email
    })

    try{
        const savePost = await post.save()
        res.status(200).json({status: '200', result: savePost})
    } catch (err) {
        res.status(400).json({status: '400', result: [], message: err})
    }
})

//get a specific posts 
router.get('/:postId', async (req,res) => {
    try{
        const post = await Post.findById(req.params.postId)
        if (post != null) {
            res.status(200).json({status: '200', result: post})
        } else {
            res.status(404).json({status: '404', result: [], message: 'Data Not Found'})
        }
    } catch (err) {
        res.status(400).json({status: '400', result: [], message: err})
    }
})

//delete post
router.delete('/:postId', async (req,res) => {
    try{
        const removePost = await Post.remove({_id: req.params.postId})
        res.status(200).json({status: '200', result: []})
    } catch (err) {
        res.status(400).json({status: '400', result: [], message: err})
    }
})

//update a specific post
router.patch('/:postId', async (req,res) => {
    try{
        const updatePosts = await Post.updateOne(
            { _id: req.params.postId},
            { $set: { title: req.body.title }}
        )
        res.status(200).json({status: '200', result: updatePosts})
    } catch (err) {
        res.status(400).json({status: '400', result: [], message: err})
    }
})

module.exports = router