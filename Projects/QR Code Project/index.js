
import inquirer from 'inquirer';
import qr from 'qr-image'
import fs from 'fs';

// Ask user for input
inquirer
    .prompt([
        {
            type: 'input',
            name: 'url',
            message: "Enter the URL you want to generate the QR code for",
        }
    ])
    .then((answers) => {
        const url = answers.url;
        fs.writeFile('userInput.txt', url, (err) => {
            if (err) throw error;
            console.log("The file has been saved");
        });

        // Generate QR Code
        var qr_svg = qr.image(url, { type: 'png' });
        var stream = fs.createWriteStream('qr-image-mine.png');
        qr_svg.pipe(stream);

        console.log(url);
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
            console.log(error);
        } else {
            // Something else went wrong
            console.log("Else");
        }
    });

