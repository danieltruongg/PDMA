/**
 * @author Daniel Truong <dtru0010@student.monash.edu>
 */

/**
 * Package Router Module
 * @requires express
 * @requires packageController
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
 * Package Controller object
 * @const
 */
const packageCont = require("../controllers/packageController");

/**
 * Route serving List Packages Page
 * @name get/ListPackagesPage
 * @function
 * @param {string} path - The URL path
 * @param {Function} handlers - Handler function for request at path
 */
router.get("/", packageCont.packagesList);

/**
 * Route serving Add Package Page
 * @name get/AddPackagePage
 * @function
 * @param {string} path - The URL path
 * @param {Function} handlers - Handler function for request at path
 */
router.get("/add", packageCont.addPackages);

/**
 * Route serving Add Package Operation
 * @name post/AddPackageOperation
 * @function
 * @param {string} path - The URL path
 * @param {Function} handlers - Handler function for request at path
 */
router.post("/add/data", packageCont.addPackagesHandler);

/**
 * Route serving Remove Package Page
 * @name get/RemovePackagePage
 * @function
 * @param {string} path - The URL path
 * @param {Function} handlers - Handler function for request at path
 */
router.get("/delete", packageCont.deletePackages);

/**
 * Route serving Remove Package Operation
 * @name get/RemovePackageOperation
 * @function
 * @param {string} path - The URL path
 * @param {Function} handlers - Handler function for request at path
 */
router.get("/delete-package", packageCont.deletePackagesHandler);

module.exports = router;