import express from "express";
import axios from "axios";

const app = express();
const port = 3005;

const categoriesUrl = "https://v2.jokeapi.dev/categories";
const url = "https://v2.jokeapi.dev/joke";

var categories;
var selectedCategory = "any"

app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))


app.get("/", async (req, res) => {
    try {
        categories = (await axios.get(categoriesUrl)).data.categories;

        const response = await axios.get(`${url}/${selectedCategory}`);
        const emoji = `../images/emoji-${emojiGenerator()}.png`

        if (response.data.type == "single") {
            res.render("index.ejs", {
                setup: response.data.joke,
                delivery: response.data.delivery,
                image: emoji,
                categoryData : categories,
            })
        }
        else{
            res.render("index.ejs", {
                setup: response.data.setup,
                delivery: response.data.delivery,
                image: emoji,
                categoryData : categories,
            })
        }
    }
    catch (error) {
        console.log("Error: " + error.message);
        res.status(500);
    }
})

app.post("/", (req, res) =>{
    selectedCategory = req.body.category;
    res.redirect("/");
})



function emojiGenerator() {
    var id = Math.floor(Math.random() * 5) + 1;
    return id;
}



app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})