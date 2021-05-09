const path = require('path');
const express = require('express');
const getJson = require('../helpers/getJSON');
const tools = require('../helpers/tools');


const router = express.Router();

router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'table.html'));
});

module.exports = router;