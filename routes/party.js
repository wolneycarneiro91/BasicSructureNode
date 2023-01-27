const router = require('express').Router();
const partyController = require('../controllers/partyController');
const { checkToken } = require('../controllers/userController');

router.route("/parties", ).post(checkToken,(req, res) => partyController.create(req, res))
router.route("/parties").get(checkToken,(req, res) => partyController.getAll(req, res))
router.route("/parties/:id").get(checkToken,(req, res) => partyController.get(req, res))
router.route("/parties/:id").delete(checkToken,(req, res) => partyController.delete(req, res))
router.route("/parties/:id").put(checkToken,(req, res) => partyController.update(req, res))

module.exports = router;