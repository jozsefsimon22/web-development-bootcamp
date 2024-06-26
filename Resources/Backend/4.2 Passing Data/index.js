import express from "express";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

var heading = "Enter your name below";

app.get("/", (req, res) => {
  const data = {
    headingText: heading
  };
  res.render("index.ejs", data)
});

app.post("/submit", (req, res) => {
  var count = countLetters(req.body["fName"], req.body["lName"]);
  heading = "You have " + count + " letters in your name!"
  const dataToSend = {
    headingText: heading
  }
  console.log(dataToSend);
  res.render("index.ejs", dataToSend)

});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

function countLetters(firstName, secondName){
  var name = firstName + secondName;
  var nameLength = name.length;
  console.log(name);
  return nameLength;
}