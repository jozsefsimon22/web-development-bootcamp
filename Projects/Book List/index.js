import express from "express"
import pg from "pg"

const app = express();
const port = 3000;
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "booklist",
    password: "1992",
    port : 5432
})
db.connect();

app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))

app.get("/", async (req, res) => {
    let bookData = []
    try{
        const response = await db.query("SELECT * FROM books");
        bookData = response.rows;
    }
    catch(err){
        console.error(err);
    }
    
    res.render("index.ejs", {
        books : bookData
    })
})

app.get("/new", (req, res) => {
    res.render("new.ejs")
})

app.post("/new", async (req, res) =>{
    var name = req.body.name;
    var isbn = req.body.isbn;
    var score = req.body.rating;
    var comment = req.body.comment;

    try{
        await db.query("INSERT INTO books (name, score, isbn, comment) VALUES( $1, $2, $3, $4)",
            [name, score, isbn, comment]
        )
    }
    catch (err) {
        console.error(err)
    }

    res.redirect("/")
})

app.get("/book", (req, res) =>{
    const id = req.body.id;

    try{
        const response = db.query(`SELECT * FROM books WHERE ID = ${id}`)
    }
    catch(err){
        console.log(err);
        
    }

    res.render("view-book.ejs")
})

app.delete("/delete", async(req, res) => {
    const bookId = req.body.id

    console.log(bookId);
    

    res.redirect("/");
})

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
})

