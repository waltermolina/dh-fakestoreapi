const express = require('express')
const router = express.Router()
const store = require('../controller/store')

router.get('/',store.getAllStore)
router.get('/:id',store.getStore)

router.post('/',store.addStore)
router.post('/new',store.addStore)

router.put('/:id',store.editStore)
router.put('/:id/edit',store.editStore)
router.patch('/:id',store.editStore)
router.patch('/:id/edit',store.editStore)

//router.delete('/:id',user.deleteStore)

module.exports = router