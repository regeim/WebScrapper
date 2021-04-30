const path = require('path');
const express = require('express');
const getJson = require('../helpers/getJSON');


const router = express.Router();

router.get('/', (req, res, next) => {
    getJson.runPostTitles();
    res.sendFile(path.join(__dirname, '../', 'views', 'table.html'));
});

module.exports = router;