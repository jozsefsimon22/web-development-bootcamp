import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3010;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "1992",
  port : 5432
})
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const username = req.body.username
  const password = req.body.password

  try{
    await db.query(`INSERT INTO users (email, password) VALUES ('${username}', '${password}')`)
    console.log("Data base query successful")
    res.redirect("/")
  }
  catch(err){
    console.error(err)
  }
});

app.post("/login", async (req, res) => {
  const username = req.body.username
  const password = req.body.password

  try{
    await db.query(`SELECT password FROM users WHERE email = ${username}`)
  }catch (err){
      console.log(err);
    }

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
