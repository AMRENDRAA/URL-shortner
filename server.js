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
const UserRoutes = require('./Routes/UserRoutes');



app.use("/api/url", Urlroute);
app.use("/api/users", UserRoutes);
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            status: "fail",
            message: "Invalid JSON format in request body."
        });
    }
    next();
});



app.listen(port, () => {

    console.log(`Server is running on  ${port} `)


});





