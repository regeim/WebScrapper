const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const tools = require('../helpers/tools');
const http = require('http');
const path = require('path');
const classes = require('../public/classes.json')





//get Forum title and comment number and push it in array of objects
const getPostTitles = async (url ,country) => {
    try {
        const { data } = await axios.get(url);
//        console.log(data);
        const $ = cheerio.load(data);
        let myArray =[];


        let selectTitles = $('span.link-top-line > a');
        let selectNumber = $('span.posts');
        let selectDate = $('td.views + td');


        selectTitles.each((_idx, el) => {
            let title = $(el).text();
            let link = $(el).attr('href');
            let s  = `<a href=${link} target="_blank">${title}</a>`
            let o = {
                name: s,
                country: country
            };
            myArray.push(o);
        });

        selectDate.each((_idx, el) => {
            let date = $(el).text().replace(/(\n)/g,'');
            let data = myArray[_idx];
            data["date"] = date;
        });

        selectNumber.each((_idx, el) => {
            let commentNumber = $(el).text();
            let data = myArray[_idx];
            data["number"] = commentNumber;
//
        });

        return(myArray);


    } catch (error) {
        throw error;
    }
};


const saveData = function(dataToSave){
    tools.saveToFile(dataToSave);
}

const startRunThenSave = async () => {
    let concatData = [];
    let i = 0;
    for await (const value of classes) {

        concatData = concatData.concat((await getPostTitles(value.uslink, 'US')
            .then(function (p){
                p.forEach((element, i, array) => array[i].class = value.name)
                console.log(value.name);
                console.log(i);
                return p;
            })))
        concatData = concatData.concat((await getPostTitles(value.link, 'Europe')
            .then(function (p){
                p.forEach((element, i, array) => array[i].class = value.name)
                console.log(value.name);
                console.log(i);
                return p;
            })))
        i ++;
        if (i == classes.length) {
            saveData(concatData);
        }
    };
}

// startRunThenSave();
exports.runPostTitles = startRunThenSave;
