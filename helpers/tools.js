const fs = require('fs');
const path = require('path');

const saveToFile = (file,jsonData, className) => {
    let today = new Date().toISOString().slice(0, 10)

//    console.log(__dirname + ' tools.js');
//    console.log(path.join(__dirname, `../savedFiles/`));
    file.writeFile(path.join(__dirname, `../public/${className}-${today}.txt`), jsonData, function (err) {
        if (err) {
            console.log(err);
        }
    });
};

const readFromFile = (file) => {
    return JSON.parse(fs.readFileSync(file));
};

module.exports = {
    saveToFile
};

// console.log(readFromFile('test.txt'));
// console.log('Current directory: ' + process.cwd());