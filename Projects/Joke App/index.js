import express from "express";
import axios from "axios";


const app = express();
const port = process.env.PORT || 3005;

const categoriesUrl = "https://v2.jokeapi.dev/categories";
const url = "https://v2.jokeapi.dev/joke";

let categories;
let selectedCategory = "any";

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


// Fetch categories once at server start
(async () => {
    try {
        const response = await axios.get(categoriesUrl);
        categories = response.data.categories;
    } catch (error) {
        console.error("Failed to fetch categories: ", error.message);
    }
})();

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(`${url}/${selectedCategory}`);
        const emoji = `../images/emoji-${emojiGenerator()}.png`;
        
        const jokeData = {
            setup: response.data.setup || response.data.joke,
            delivery: response.data.delivery,
            image: emoji,
            categoryData: categories,
        };

        res.render("index.ejs", jokeData);
    } catch (error) {
        console.error("Error: " + error.message);
        res.status(500).send('Internal Server Error');
    }
});

app.post("/", (req, res) => {
    selectedCategory = req.body.category;
    res.redirect("/");
});

function emojiGenerator() {
     return Math.floor(Math.random() * 5) + 1;
}

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
