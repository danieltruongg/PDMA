/**
 * @author Daniel Truong <dtru0010@student.monash.edu>
 */

/**
 * Miscellaneous API Router Module
 * @requires express
 * @requires driverController
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
 * Driver API Controller module
 * @const
 */
const miscCont = require("../controllers/miscApiController");

/**
 * Route serving API statistics
 * @name get/APIListDrivers
 * @function
 * @param {string} path - The URL path
 * @param {Function} handlers - Handler function for request at path
 */
router.get("/statistics", miscCont.statsListApi);

module.exports = router;