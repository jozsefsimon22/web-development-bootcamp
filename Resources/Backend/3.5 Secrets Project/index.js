import express from 'express';
import { dirname } from "path";
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
var passwordEntered = "";
const correctPassword = "ILoveProgramming";

function logger(req, res, next){
    console.log(req.body);
    passwordEntered = req.body["password"];
    next();
}

const app = express();
const port = 3000; 

app.use(express.urlencoded({extended : true}));
app.use(logger);

app.get("/", (req, resp) =>{
    resp.sendFile(__dirname + "/public/index.html");
})

app.post("/check", (req, resp) =>{
    if(passwordEntered === correctPassword){
        resp.sendFile(__dirname + "/public/secret.html")
    }
    else{
        resp.sendFile(__dirname + "/public/index.html")
    }
    
})

app.listen(port, () =>{
    console.log(`Listening on port ${port}`)
})