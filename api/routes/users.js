const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const controller = require("../controllers/user");

router.get("/", controller.index);

router.get("/:id", controller.show);

router.post("/", controller.create);


module.exports = router;
