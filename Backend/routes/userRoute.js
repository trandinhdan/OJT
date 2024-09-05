const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.postRegister);

router.post("/login", userController.postLogin);

router.post("/checkPassword", userController.postCheckPassword);

router.get("/", userController.getAllUsers);
router.get("/:userId", userController.getUserById);
router.post(
    "/logout",
    (req, res, next) => {
        console.log("Route /logout đã được hit với phương thức POST");
        next();
    },
    userController.postLogout,
);
router.get("/getAllUsersExceptCurrent/:userId", userController.getAllUsersExceptCurrent);



module.exports = router;
