import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const url = "https://secrets-api.appbrewery.com/random";

app.use(express.static("public"));

app.get("/", async (req, res) => {
    try{
        const result = await axios.get(url);
        res.render("index.ejs", {
            secret : result.data.secret,
            user : result.data.user
        });
    }
    catch (error){
        console.log("Error" + error.message)
    }
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})