const express = require("express");
require('dotenv').config()
const app = express()
const port = process.env.PORT;

const ConnectDB = require('./Config/Dbconnection');

app.use(express.json());


ConnectDB();
app.get('/', (req, res) => {
    res.send('Hello World!')
})

const Urlroute = require('./Routes/UrlRoute');


app.use("/api/url", Urlroute);

app.listen(port, () => {

    console.log(`Server is running on  ${port} `)


});





