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
    if(err.code === '23505'){
      res.status(400).send("Email address already exists")
    }
    else{
      res.status(500).send("An error occurred while registering user.")
    }
  }
});

app.post("/login", async (req, res) => {
  const username = req.body.username
  const password = req.body.password

  try{
    const user = await db.query('SELECT * FROM users WHERE email = $1', [username]);

    if(user.rows.length === 0){
      return res.status(404).send("User not found");
    }

    const dbPassword = user.rows[0].password;

    if(dbPassword === password){
      res.render("secrets.ejs")
    }
    else{
      return res.status(401).send("Incorrect password")
    }
  }catch (err){
      console.log(err);
      res.status(500).send("An error occurred while logging in.")
    }

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
