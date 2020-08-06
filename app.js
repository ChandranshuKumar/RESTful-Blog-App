const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const expressSanitizer = require('express-sanitizer');

const Blog = require('./models/blog');

const blogRoutes = require('./routes/blogs');

// APP Config
const db_url = "mongodb://chandranshu:12345678a@ds029837.mlab.com:29837/restful-blog-app";
mongoose.connect(db_url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

app.use("/", blogRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`RESTful BlogApp has started at post ${port}`);
});
