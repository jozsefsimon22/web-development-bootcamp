import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "1992",
  port : 5432
})
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function getItems(){
  let items = []

  try{
    const result = await db.query("SELECT * FROM items");
    if(result){
      items = result.rows
    }
  }
  catch(err){
    console.error(err)
  }

  return items;
}

app.get("/", async (req, res) => {
  
  let items = await getItems();

  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  try{
    await db.query("INSERT INTO items (title) VALUES ($1)",
      [item]
    )
  }
  catch (err){
    console.log(err)
  }
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  const itemId = req.body.updatedItemId;
  const itemTitle = req.body.updatedItemTitle;

  try{
    await db.query(`UPDATE items SET title = '${itemTitle}' WHERE id = ${itemId}`)
  }
  catch(err){
    console.error(err)
  }

  res.redirect("/")
});

app.post("/delete", async (req, res) => {
  const itemId = req.body.deleteItemId

  try{
    await db.query(`DELETE FROM items WHERE id = ${itemId}`)
  }
  catch(err){
    console.error(err)
  }

  res.redirect("/")
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
