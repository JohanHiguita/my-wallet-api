const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const controller = require("../controllers/config");

router.get("/:user_id", controller.show);

router.post("/", controller.create);


module.exports = router;
