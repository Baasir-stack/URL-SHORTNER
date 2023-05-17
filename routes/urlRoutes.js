const express = require('express')

const router  =express.Router()

const {genrateShortId,
    redirectToURL,
    getAnalytics
}  =require('../controllers/urlController')

router.post('/',genrateShortId)

router.get('/:shortId',redirectToURL)

router.get('/analytics/:shortId',getAnalytics)


module.exports = router