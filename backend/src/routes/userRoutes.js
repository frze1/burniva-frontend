const express =
require("express");

const router =
express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {

 getProfile,
 updateProfile,
 changePassword

} =
require(
"../controllers/userController"
);


// GET PROFILE
router.get(
 "/profile",
 authMiddleware,
 getProfile
);

// UPDATE PROFILE
router.put(
 "/profile",
 authMiddleware,
 updateProfile
);

// CHANGE PASSWORD
router.put(
 "/change-password",
 authMiddleware,
 changePassword
);

module.exports =
router;