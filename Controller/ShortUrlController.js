const shortid = require('shortid');

const UrlModel = require('../Model/UrlModel');


const createnewshortUrl = async (req, res) => {

    try {
        const { originalUrl } = req.body;

        if (!originalUrl) {
            return res.status(400).json({
                "status": "Failed",
                "message": "Please provide url "

            })
        }

        const shortCode = shortid();

        const newid = await UrlModel.create({
            originalUrl,
            shortCode,
            clicks: 0,





        })

        res.status(201).json({
            status: "success",
            Data: {
                id: newid._id,
                originalUrl: newid.originalUrl,
                shortCode: newid.shortCode,
                shorturl: `http://localhost:3000/${newid.shortCode}`,
                createdAt: newid.createdAt,
                updatedAt: newid.updatedAt,
                createdBy: req.user.id
            }

        })
    } catch (err) {


        res.status(400).json({
            status: "Failed",
            err: err.message


        })
    }





}

const geturl = async (req, res) => {

    try {

        //         const { shortCode } = req.params

        // find document by shortCode

        // if not found:
        //    return 404

        // increment clicks

        // redirect to originalUrl

        const { shortCode } = req.params;
        const urlid = await UrlModel.findOne({ shortCode });
        if (!urlid) {
            res.status(400).json({
                status: "Failed",
                message: "URL not found "
            })
        }
        urlid.clicks += 1;
        await urlid.save();


        return res.redirect(urlid.originalUrl);



    } catch (err) {
        res.status(400).json({
            status: "Failed",
            err: err.message
        })
    }


}


const getstats = async (req, res) => {

    try {
        console.log("getstats")
        const { shortCode } = req.params;
        const urlid = await UrlModel.findOne({ shortCode });

        if (!shortCode) {
            res.status(400).json({
                status: "Failed",
                message: "Not found"
            })
        }

        const count = urlid.clicks;
        res.status(201).json({
            status: "Success",
            count: count
        })


    } catch (err) {
        res.status(400).json({
            status: "Failed",
            err: err.message
        })
    }
}
module.exports = {
    createnewshortUrl,
    geturl,
    getstats

}