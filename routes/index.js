const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send({ success: true, message: "Healthy" });
});

module.exports = router;