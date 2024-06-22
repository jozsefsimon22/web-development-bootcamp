import express from 'express';
const app = express();
const port = 3000;

app.listen(port, () =>{
    console.log(`Server is listening on port ${port}`);
});

app.get("/", (req, resp) =>{
    // resp.send("Hello World from HTTP Requests");
    resp.send("<h1>Hello</h1>")
})

app.get("/about", (req, resp) =>{
    resp.send("<p>My name is Jozsef Simon, and I'm a full stack developer!</p>")
})

app.get("/contact", (req, resp) =>{
    resp.send("<h1>Contact</h1><br>Mobile: 07870994066")
})