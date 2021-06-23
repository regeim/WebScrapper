const fs = require('fs');
const path = require('path');

const saveToFile = (jsonData, fileNumber) => {
    let today = new Date().toISOString().slice(0, 10);
    let fPath = path.join(__dirname, `../public/${today}_${fileNumber}.txt`);
    fs.appendFile(fPath, JSON.stringify(jsonData, null, "\t"), function (err) {
        console.log(`${fPath}`);
        if (err) {
            console.log(err);
        }
    });
    fileNumber != 1 ? delFile(1) : delFile(2);
};

const delFile = (fileNumber) => {
    let today = new Date().toISOString().slice(0, 10);
    let fPath = path.join(__dirname, `../public/${today}_${fileNumber}.txt`);
    if (fs.existsSync(fPath)) {
            fs.unlinkSync(fPath);
            console.log(`${fPath} was deleted`);
    }
}

const readFromFile = (file) => {
    return JSON.parse(fs.readFileSync(file));
};

const copyFile = () => {
    let today = new Date().toISOString().slice(0, 10);
    const fileOne = path.join(__dirname, `../public/${today}_1.txt`);
    const fileTwo = path.join(__dirname, `../public/${today}_2.txt`);
    fs.copyFile(fileOne, fileTwo);
}

module.exports = {
    saveToFile,
    delFile,
    copyFile
};

// console.log(readFromFile('test.txt'));
// console.log('Current directory: ' + process.cwd());