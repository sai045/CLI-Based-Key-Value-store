const express = require('express');
const router = express.Router();

const keyValueController = require('../controllers/keyValueControllers');

router.post('/', keyValueController.store);
router.get('/:key', keyValueController.retrieve);
router.put('/:key', keyValueController.update);
router.delete('/:key', keyValueController.delete);

module.exports = router;
