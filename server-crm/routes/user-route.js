const express = require('express');
const { registerUser, Login } = require('../controller/user');
// const { protect } = require('../middleware/authMiddleware');


const router = express.Router();

router.post("/sign-up",  registerUser);
router.post("/sign-in",  Login);



module.exports = router;