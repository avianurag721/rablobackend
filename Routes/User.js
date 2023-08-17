const express = require("express")
const router = express.Router()

const { login, signUp } = require("../Controllers/Auth")
const{auth} =require("../middleware/auth")


// Route for user signup
router.post("/signup", signUp)

router.post("/login", login)

module.exports = router