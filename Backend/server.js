const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const conn = require('./config/db/db');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// Home Route
app.get("/", (req, res) =>{
    res.send("API is Working Properly")
})


// Routes

app.get('/api', (req, res) => {
    res.send("Working")
})

app.get('/api/posts', function (req, res) {
    getAllPosts(res)
})

app.get('/api/posts/:id', function (req, res) {
    const id = req.params.id;
    getPostsById(res, id)
})

// Post Methods

app.post('/api/create', (req, res) => {

    const name = req.body.name;
    const title = req.body.title;
    const text = req.body.text;
    createPost(name, title, text,res);
    
})


app.post('/api/likes/:id', function (req, res) {
    const id = req.params.id;
    postLikes(res, id);
})


// Delete Methods

app.delete('/api/delete/:id', function (req, res) {
    const id = req.params.id;
    
    deletePostById(res,id);
})

// DB Connection

// Create Post

createPost = (name, title, text, res) => {

    const sql = 'INSERT INTO `posts`(`title`, `post_text`, `user_name`) VALUES (?,?,?)'
    conn.query(sql, [title,text,name], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            // res.send(result)
            res.sendStatus(200);
        }
    })
    
}

// Like a Post

postLikes = (res, id) => {

    const sql = "UPDATE posts SET likes = likes + 1 WHERE id = ?"
    conn.query(sql, { id }, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(result)
            res.sendStatus(200);
        }
    })

}


// Get Posts

// Get All Posts
getAllPosts = (res) => {
    const sql = "SELECT * FROM posts"
    conn.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result);
        }
    })
}

// Get Posts By ID

getPostsById = (res, id) => {
    const sql = "SELECT * FROM posts WHERE id = ?";
    conn.query(sql, id, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
}




// Delete Posts
deletePostById = (res, id) => {
    const sql = "DELETE FROM posts WHERE id= ?"
    conn.query(sql, id, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log("Deleted Successfully")
        }
    })
}

const PORT = process.env.PORT || 8080

app.listen(PORT,(err) =>{
    if (err) {
        console.log(err)
    }
    else{
        console.log(`Server is running at http://localhost:${PORT}`)
    }
})

module.exports = app;