import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'world',
  password: '1992',
  port: 5432
})

db.connect();

let countries;

async function getCountries() {
  return new Promise((resolve, reject) => {
    db.query("SELECT country_code FROM visited_countries", (err, res) => {
      if (err) {
        console.error("Error executing query", err.stack)
        return reject(err)
      }
      else {
        countries = [];
        const result = res.rows;
        result.forEach(country => countries.push(country.country_code))
        console.log(countries);
        return resolve();
      }
      db.end
    })
  })
}


app.get("/", async (req, res) => {
  await getCountries();
  res.render('index.ejs', {
    countries: countries,
    total: countries.length
  })
});

app.post("/add", async (req, res) => {
  let input = req.body['country'];
  input = input[0].toUpperCase() + input.substring(1).toLowerCase()

  console.log(input)

  let countrySign;

  if (input) {
    db.query(`SELECT country_code FROM countries WHERE country_name LIKE '${input}'`, (err, res) => {
      if (err) {
        console.error("Error executing select query", err.stack)
        return res.redirect("/")
      }
      else {
        if (res.rows.length > 0) {
          countrySign = res.rows;
          countrySign = countrySign[0]['country_code'];
          db.query(`INSERT INTO visited_countries (country_code) VALUES ('${countrySign}')`, (err, res) => {
            if (err) {
              console.error("Error executing insert query", err.stack)
            }
          })
        }
      }
    })
  }
  res.redirect("/")
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
