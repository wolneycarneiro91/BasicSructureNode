const router = require('express').Router();

const serviceRouter = require("./service");
const partyRouter = require("./party");

router.use("/", serviceRouter);
router.use("/", partyRouter);
module.exports = router;

