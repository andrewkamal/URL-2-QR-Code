import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer.prompt([
    {
        message: "Please input the URL you would like to convert to a QR code: ",
        name: "URL"
    }
])
.then(answer => {
    console.log(answer);
    var qr_svg = qr.image(answer.URL, { type: 'png', size: 20});
    qr_svg.pipe(fs.createWriteStream('url_qr.png'));
    console.log(qr_svg);
    fs.writeFile('URL.txt', answer.URL, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
})
.catch(error => {
    if (error.isTtyError) {
        console.log(`Prompt couldn't be rendered in the current environment`);
    }
});