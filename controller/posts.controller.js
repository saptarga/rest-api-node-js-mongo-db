const Post = require('../models/posts.model')
const { body, validationResult } = require('express-validator')
const { logger } = require('../utils/logger');

exports.create = async (req, res) => {
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
        logger.error(`${req.originalUrl} - ${req.ip} - ${err} `);
        res.status(400).json({status: '400', result: [], message: err})
    }
}

exports.findAll = async (req, res) => {
    try{
        const post = await Post.find()
        res.status(200).json({status: '200', result: post})
    } catch(err) {
        logger.error(`${req.originalUrl} - ${req.ip} - ${err} `);
        res.status(400).json({status: '400', result: [], message: err})
    }
}

exports.findById = async (req, res) => {
    try{
        const post = await Post.findById(req.params.postId)
        if (post != null) {
            res.status(200).json({status: '200', result: post})
        } else {
            res.status(404).json({status: '404', result: [], message: 'Data Not Found'})
        }
    } catch (err) {
        logger.error(`${req.originalUrl} - ${req.ip} - ${err} `);
        res.status(400).json({status: '400', result: [], message: err})
    }
}

exports.deleteById = async (req, res) => {
    try{
        const removePost = await Post.remove({_id: req.params.postId})
        res.status(200).json({status: '200', result: []})
    } catch (err) {
        logger.error(`${req.originalUrl} - ${req.ip} - ${err} `);
        res.status(400).json({status: '400', result: [], message: err})
    }
}

exports.updateById = async (req, res) => {
    try{
        const updatePosts = await Post.updateOne(
            { _id: req.params.postId},
            { $set: { title: req.body.title }}
        )
        res.status(200).json({status: '200', result: updatePosts})
    } catch (err) {
        logger.error(`${req.originalUrl} - ${req.ip} - ${err} `);
        res.status(400).json({status: '400', result: [], message: err})
    }
}

exports.validate = (method) => {
  switch (method) {
    case 'create': {
        return [ 
            body('email', 'Invalid email').exists().isEmail()
        ]
    }
  }
}