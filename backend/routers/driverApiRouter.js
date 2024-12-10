/**
 * @author Daniel Truong <dtru0010@student.monash.edu>
 */

/**
 * Driver API Router Module
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
const driverCont = require("../controllers/driverApiController");

/**
 * Route serving API List Drivers
 * @name get/APIListDrivers
 * @function
 * @param {string} path - The URL path
 * @param {Function} handlers - Handler function for request at path
 */
router.get("/", driverCont.driversListApi);

/**
 * Route serving API Add Driver
 * @name get/APIAddDriver
 * @function
 * @param {string} path - The URL path
 * @param {Function} handlers - Handler function for request at path
 */
router.post("/add", driverCont.addDriverApi);

/**
 * Route serving API Remove Driver
 * @name get/APIRemoveDriver
 * @function
 * @param {string} path - The URL path
 * @param {Function} handlers - Handler function for request at path
 */
router.delete("/delete", driverCont.deleteDriverApi);

/**
 * Route serving API Update Driver
 * @name get/APIUpdateDriver
 * @function
 * @param {string} path - The URL path
 * @param {Function} handlers - Handler function for request at path
 */
router.put("/update", driverCont.updateDriverApi);

module.exports = router;