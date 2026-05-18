const express =
require("express");

const router =
express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {
 analyzeBurnout
} =
require(
"../controllers/predictionController"
);

router.post(
 "/analyze",
 authMiddleware,
 analyzeBurnout
);

module.exports =
router;