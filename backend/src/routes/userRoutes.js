const express =
require("express");

const router =
express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {

 changePassword

} =
require(
"../controllers/userController"
);


// CHANGE PASSWORD
router.put(
 "/change-password",
 authMiddleware,
 changePassword
);

module.exports =
router;