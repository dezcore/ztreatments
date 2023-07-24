const express = require('express')
const router = express.Router()
const dbService = require('../services/db')
const imgService = require('../services/img')
const serieService = require('../services/serie')

/*GET test responses */
router.get('/', (req, res) => {
  //imgService.imgRedimension()
  //dbService.testDb()
  imgService.downloadImg()
  serieService.getSeries(req, res)
})

router.post('/', (req, res)=> {
  serieService.postUserResponse(req, res)
})

/* PUT test responses */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await serieService.update(req.params.id, req.body))
  } catch (err) {
    console.error(`Error while updating test responses`, err.message)
    next(err)
  }
})

/*DELETE test responses*/
router.delete('/folder/:name', (req, res) => {
  serieService.removeFolder(req, res)
})

module.exports = router