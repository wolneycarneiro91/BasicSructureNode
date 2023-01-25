const router = require('express').Router();

const serviceRouter = require("./service");
const partyRouter = require("./party");
const userRouter = require("./user");

router.use("/", serviceRouter);
router.use("/", partyRouter);
router.use("/", userRouter);
module.exports = router;

