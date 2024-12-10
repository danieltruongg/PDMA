/**
 * @author Daniel Truong <dtru0010@student.monash.edu>
 */

/**
 * Package API Router Module
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
 * Package API Controller module
 * @const
 */
const packageCont = require("../controllers/packageApiController");

/**
 * Route serving API List Packages
 * @name get/APIListPackages
 * @function
 * @param {string} path - The URL path
 * @param {Function} handlers - Handler function for request at path
 */
router.get("/", packageCont.packagesListApi);

/**
 * Route serving API Add Package
 * @name get/APIAddPackage
 * @function
 * @param {string} path - The URL path
 * @param {Function} handlers - Handler function for request at path
 */
router.post("/add", packageCont.addPackageApi);

/**
 * Route serving API Remove Package
 * @name get/APIRemovePackage
 * @function
 * @param {string} path - The URL path
 * @param {Function} handlers - Handler function for request at path
 */
router.delete("/delete/:package_id", packageCont.deletePackageApi);

/**
 * Route serving API Update Package
 * @name get/APIUpdatePackage
 * @function
 * @param {string} path - The URL path
 * @param {Function} handlers - Handler function for request at path
 */
router.put("/update", packageCont.updatePackageApi);

module.exports = router;