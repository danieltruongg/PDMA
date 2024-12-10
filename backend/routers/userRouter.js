/**
 * @author Daniel Truong <dtru0010@student.monash.edu>
 */

/**
 * User Router Module
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
 * User Controller module
 * @const
 */
const userCont = require("../controllers/userController");

/**
 * Route serving Login Page
 * @name get/LoginPage
 * @function
 * @param {string} path - The URL path
 * @param {Function} handlers - Handler function for request at path
 */
router.get("/login", userCont.login);

/**
 * Route serving Login Operation
 * @name get/LoginOperation
 * @function
 * @param {string} path - The URL path
 * @param {Function} handlers - Handler function for request at path
 */
router.post("/login/data", userCont.loginHandler);

/**
 * Route serving Signup Page
 * @name get/SignupPage
 * @function
 * @param {string} path - The URL path
 * @param {Function} handlers - Handler function for request at path
 */
router.get("/signup", userCont.signup);

/**
 * Route serving Signup Operation
 * @name get/SignupOperation
 * @function
 * @param {string} path - The URL path
 * @param {Function} handlers - Handler function for request at path
 */
router.post("/signup/data", userCont.signupHandler);

module.exports = router;