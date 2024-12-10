/**
 * @author Daniel Truong <dtru0010@student.monash.edu>
 */

/**
 * Driver Router Module
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
 * Driver Controller object
 * @const
 */
const driverCont = require("../controllers/driverController");

/**
 * Route serving List Drivers Page
 * @name get/ListDriversPage
 * @function
 * @param {string} path - The URL path
 * @param {Function} handlers - Handler function for request at path
 */
router.get("/", driverCont.driversList);

/**
 * Route serving Add Driver Page
 * @name get/AddDriverPage
 * @function
 * @param {string} path - The URL path
 * @param {Function} handlers - Handler function for request at path
 */
router.get("/add", driverCont.addDrivers);

/**
 * Route serving Add Driver Operation
 * @name post/AddDriverOperation
 * @function
 * @param {string} path - The URL path
 * @param {Function} handlers - Handler function for request at path
 */
router.post("/add/data", driverCont.addDriversHandler);

/**
 * Route serving Remove Driver Page
 * @name get/RemoveDriverPage
 * @function
 * @param {string} path - The URL path
 * @param {Function} handlers - Handler function for request at path
 */
router.get("/delete", driverCont.deleteDrivers);

/**
 * Route serving Remove Driver Operation
 * @name get/RemoveDriverOperation
 * @function
 * @param {string} path - The URL path
 * @param {Function} handlers - Handler function for request at path
 */
router.get("/delete-driver", driverCont.deleteDriversHandler);

/**
 * Route serving Filter Drivers by Department
 * @name get/FilterDriversbyDepartment
 * @function
 * @param {string} path - The URL path
 * @param {Function} handlers - Handler function for request at path
 */
router.get("/department", driverCont.driversDepartFilter);

/**
 * Route serving List Drivers by Department Page
 * @name get/ListDriversbyDepartmentPage
 * @function
 * @param {string} path - The URL path
 * @param {Function} handlers - Handler function for request at path
 */
router.get("/department_view", driverCont.driversDepartList);

/**
 * Route serving Remove Driver in Driver by Department Operation
 * @name post/RemoveDriverinDriverbyDepartmentOperation
 * @function
 * @param {string} path - The URL path
 * @param {Function} handlers - Handler function for request at path
 */
router.post("/department-delete", driverCont.deleteDriversDepartHandler);

module.exports = router;