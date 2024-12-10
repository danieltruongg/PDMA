/**
 * @author Daniel Truong <dtru0010@student.monash.edu>
 */

/**
 * Miscellaneous Router Module
 * @requires express
 * @requires miscController
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
 * Driver Controller object
 * @const
 */
const miscCont = require("../controllers/miscController");

/**
 * Route serving Statistics Page
 * @name get/StatisticsPage
 * @function
 * @param {string} path - The URL path
 * @param {Function} handlers - Handler function for request at path
 */
router.get("/statistics", miscCont.statsList);

module.exports = router;