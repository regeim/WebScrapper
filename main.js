const express = require('express');
const path = require('path');
const getJson = require('./helpers/getJSON');
const tools = require('./helpers/tools');
const app = express();
const tableRoutes = require('./routes/table_route');
const schedule = require('node-schedule');

let fileNumber = 0;

const job = schedule.scheduleJob('*/15 * * * *', function(){
    fileNumber !=1 ? fileNumber=1 : fileNumber=2;
    getJson.runPostTitles(fileNumber);
});


app.use(express.static(path.join(__dirname,'public')));
app.use(tableRoutes);

app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found</h1>');
});

app.listen(3000);
