const express = require('express');
const path = require('path');
const getJson = require('./helpers/getJSON');
const tools = require('./helpers/tools');
const app = express();
const tableRoutes = require('./routes/table_route');

tools.delFile();
getJson.runPostTitles();

app.use(express.static(path.join(__dirname,'public')));
app.use(tableRoutes);

app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found</h1>');
});

app.listen(3000);
