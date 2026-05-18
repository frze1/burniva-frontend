const express =
require("express");

const router =
express.Router();

const {
getHistory,
getHistoryById
} =
require(
"../controllers/historyController"
);

const authMiddleware =
require(
"../middleware/authMiddleware"
);

router.get(
"/",
authMiddleware,
getHistory
);

router.get(
"/:id",
authMiddleware,
getHistoryById
);

module.exports =
router;