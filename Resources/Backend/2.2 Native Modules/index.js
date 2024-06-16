const fs = require("fs");

// fs.writeFile('welcome.txt', 'Hello from Node', (err) => {
//     if(err) throw err;
//     console.log("The file has been saved!");
// } );

fs.readFile('welcome.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    console.log(data);
})