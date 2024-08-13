import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3005;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "1992",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users = [];

async function getUsers() {
  const result = await db.query("SELECT * FROM users");
  const users = result.rows;
  return users;
}

async function checkVisisted(userId) {
  const result = await db.query("SELECT country_code FROM visited_countries");
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  users = await getUsers();
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: "teal",
  });
});
app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/user", async (req, res) => {
  if (req.body.user) {
    currentUserId = req.body.user;
    

    const colorResult = await db.query(
      "SELECT color FROM users WHERE id = $1",
      [currentUserId]);

    const color = colorResult.rows[0].color

    const result = await db.query(
      "SELECT country_code FROM visited_countries WHERE user_id = $1",
      [currentUserId]
    )

    let countries = [];
    result.rows.forEach((country) => {
      countries.push(country.country_code);
    });

    users = await getUsers();

    res.render("index.ejs", {
      countries: countries,
      total: countries.length,
      users: users,
      color: color,
    });

  }
  else{
    res.render("new.ejs")
  }
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
  const input = req.body;
  const name = input.name;
  const color = input.color;

  try {
    await db.query(
      "INSERT INTO users (name, color) VALUES ($1, $2)",
      [name, color]
    );
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }

});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
