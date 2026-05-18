const express =
require("express");

const router =
express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {
 createDailyInput
} =
require(
"../controllers/dailyInputController"
);

router.post(
 "/",
 authMiddleware,
 createDailyInput
);

module.exports =
router;