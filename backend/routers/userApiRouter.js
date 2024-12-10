/**
 * @author Daniel Truong <dtru0010@student.monash.edu>
 */

/**
 * User API Router Module
 * @requires express
 * @requires userController
 */

/**
 * Express module
 * @const
 */
const express = require("express");

/**
 * Express Router object
 * @const
 */
const router = express.Router();

/**
 * User API Controller module
 * @const
 */
const userCont = require("../controllers/userApiController");

/**
 * Route serving API Login
 * @name get/APILogin
 * @function
 * @param {string} path - The URL path
 * @param {Function} handlers - Handler function for request at path
 */
router.post("/login", userCont.loginApi);

/**
 * Route serving API Signup
 * @name get/APISignup
 * @function
 * @param {string} path - The URL path
 * @param {Function} handlers - Handler function for request at path
 */
router.post("/signup", userCont.signupApi);

module.exports = router;