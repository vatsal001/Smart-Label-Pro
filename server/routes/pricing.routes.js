const router = require("express").Router();
const { calculatePrice } = require("../controllers/pricing.controller");
router.post("/calculate", calculatePrice);
module.exports = router;
