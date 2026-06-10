const express = require('express');

const router = express.Router();
const { createnewshortUrl, geturl, getstats } = require("../Controller/ShortUrlController");

router.post('/', createnewshortUrl);

// 👉 Specific routes first
// 👉 Generic routes last
router.get('/stats/:shortCode', getstats);

router.get('/:shortCode', geturl);




module.exports = router;