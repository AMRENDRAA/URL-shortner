const express = require('express');

const router = express.Router();
const { createnewshortUrl, geturl } = require("../Controller/ShortUrlController");

router.post('/', createnewshortUrl);

router.get('/:shortCode', geturl);



module.exports = router;