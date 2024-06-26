import express from "express";

const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

app.get("/", (req, resp) =>{
    resp.render("index.ejs")
})

app.get("/new-post", (req, resp) =>{
    resp.render("newPost.ejs")
})

app.post("/", (req, res) =>{
    const test = req.body;
    console.log(test);
    posts.push(test);
    console.log(posts);
    res.render("index.ejs", posts)
})

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`)
})

const posts = [];