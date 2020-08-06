const express = require('express');
const router = express.Router();

const Blog = require('../models/blog');

router.get("/", (req, res) => {
    res.redirect("/blogs");
});

router.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if(err) console.log("ERROR!");
        else res.render("index", {blogs: blogs});
    });
});

router.get("/blogs/new", (req, res) => {
    res.render("new");
});

router.post("/blogs", (req, res) => {
    //Sanitize the body
    req.body.blog.body = req.sanitize(req.body.blog.body);
    //create blog
    Blog.create(req.body.blog, (err, newBlog) => {
        if(err) res.redirect("new");
        else res.redirect("/blogs");
    });
});

router.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
       if(err) res.redirect("/blogs");
       else res.render("show", {blog: foundBlog});
    });
});

router.get("/blogs/:id/edit", (req, res) => {
    Blog.findById(req.params.id, (err, foundBlog) => {
        if(err) res.redirect("/blogs");
        else res.render("edit", {blog: foundBlog});
    });
});

router.put("/blogs/:id", (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
        if(err) res.redirect("/blogs");
        else res.redirect("/blogs/" + req.params.id);
    });
});

router.delete("/blogs/:id", (req, res) => {
    Blog.findByIdAndRemove(req.params.id, err => {
        res.redirect('/blogs');
    });
});

module.exports = router;