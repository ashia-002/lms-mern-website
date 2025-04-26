const express = require('express')
const {registerUser, loginUser} = require("../controllers/auth-controller.js")
const router = express.Router();
const authentication = require("../middleware/auth-middleware.js")

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/check-auth", authentication, (req, res)=>{
    const user = req.user
    res.status(200).json(
        {
            success: true,
            message: "Authenticated User!",
            data: {
                user
            }
        }
    );
});

module.exports = router;