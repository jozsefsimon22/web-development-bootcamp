import express from "express";

const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

app.get("/", (req, resp) =>{
    resp.render("index.ejs", {posts : posts})
})

app.get("/new-post", (req, resp) =>{
    resp.render("newPost.ejs")
})

app.post("/", (req, res) =>{
    posts.push(req.body);
    res.render("index.ejs", {posts : posts})
})

app.get("/post", (req, res) =>{
    const article = posts.at(req.query.id);
    res.render("post.ejs", article)
})

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`)
})

const posts = [];