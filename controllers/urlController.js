const URL = require('../models/urlModel')
const shortid = require('shortid')

const genrateShortId = async (req, res) => {

    try {
        const body = req.body

        if (!body.url) {
            res.status(400)
            throw new Error("URL IS REQUIRED")
        }
        const shortId = shortid()


        const url = await URL.create({
            shortId: shortId,
            redirectURL: body.url,
            visitHistory: []
        })
        if (!url) {
            res.status(400)
            throw new Error("Not Found")
        }

        return res.status(201).json(url)


    } catch (error) {
        res.status(500)
        throw new Error("Server Error")
    }
}

const redirectToURL = async (req, res) => {
    try {
        const shortId = req.params.shortId
        if (!shortId) {
            res.status(400)
            throw new Error("URL IS REQUIRED")
        }

        const entry = await URL.findOneAndUpdate({
            shortId
        },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                    },
                },
            }
        )
        if (!entry) {
            res.status(404)
            throw new Error("Entry not Found!")
        }

        res.redirect(entry.redirectURL)


    } catch (error) {
        res.status(500)
        throw new Error(error)
    }

}

const getAnalytics = async (req, res)=>{
    try {
        const shortId = req.params.shortId
        if (!shortId) {
            res.status(400)
            throw new Error("URL IS REQUIRED")
        }

        const result = await URL.findOne({shortId})

        if(!result){
            res.status(404)
            throw new Error("Not Found")
        }
        res.status(200).json({totalClicks:result.visitHistory.length,
        analytics:result.visitHistory
        })
    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
}

module.exports = {
    genrateShortId,
    redirectToURL,
    getAnalytics
}
