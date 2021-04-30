const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const tools = require('../helpers/tools');
const http = require('http');
const path = require('path');
const classes = require('./classes.json')


//get Forum title and comment number and push it in array of objects
const getPostTitles = async (url) => {
    try {
        const { data } = await axios.get(url);
//        console.log(data);
        const $ = cheerio.load(data);
        let myArray =[];
        let myArray2 =[];
        let forum = {};


        let selectTitles = $('span.link-top-line > a');
        let selectNumber = $('span.posts');

        selectTitles.each((_idx, el) => {
            let title = $(el).text();
            let o = {name: title};
            myArray.push(o);
        });

        selectNumber.each((_idx, el) => {
            let commentNumber = $(el).text();
            let data = myArray[_idx];
            data["number"] = commentNumber;
            myArray2.push(data);
        });

        return(myArray2);


    } catch (error) {
        throw error;
    }
};

const runPostTitles= (classObject) => {

    getPostTitles(classObject.link)
        .then(function (o){
//        save the forum objects as JSON file
            const data = JSON.stringify(o, null, "\t");
            tools.saveToFile(fs,data, classObject.name);
        });}

classes.forEach(x => runPostTitles(x));

