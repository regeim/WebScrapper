const fs = require('fs');
const path = require('path');

const saveToFile = (jsonData, i) => {
    let today = new Date().toISOString().slice(0, 10);
    let fPath = path.join(__dirname, `../public/${today}.txt`);
    fs.appendFile(fPath, JSON.stringify(jsonData, null, "\t"), function (err) {
        console.log(`${fPath}`);
        if (err) {
            console.log(err);
        }
    });
};

const delFile = () => {
    let today = new Date().toISOString().slice(0, 10);
    let fPath = path.join(__dirname, `../public/${today}.txt`);
    if (fs.existsSync(fPath)) {
            fs.unlinkSync(fPath);
            console.log(`${fPath} was deleted`);
    }
}

const readFromFile = (file) => {
    return JSON.parse(fs.readFileSync(file));
};

module.exports = {
    saveToFile,
    delFile
};

// console.log(readFromFile('test.txt'));
// console.log('Current directory: ' + process.cwd());