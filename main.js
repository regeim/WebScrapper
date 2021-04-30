const express = require('express');
const path = require('path');
// console.log(__dirname + ' main.js');
const app = express();

const tableRoutes = require('./routes/table');

app.use(express.static(path.join(__dirname,'public')));
app.use(tableRoutes);

app.use((req, res, next) => {
    res.status(404).send('<h1>Page not found</h1>');
});

app.listen(3000);
