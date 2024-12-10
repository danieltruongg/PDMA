/**
 * @author Daniel Truong <dtru0010@student.monash.edu>
 */

/**
 * Package Controller Module
 * @requires driverService
 * @requires packageService
 * @requires firebaseService
 */

/**
 * Driver Service object
 * @const
 */
const driverServ = require("../services/driverService");

/**
 * Package Service object
 * @const
 */
const packageServ = require("../services/packageService");

/**
 * Firebase Service object
 * @const
 */
const firebaseServ = require("../services/firebaseService");

/**
 * Function to handle List Packages Page
 * @constructor
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next middleware function
 */
async function packagesList(req, res, next) {
    res.render("pkg_view.html", {db: await packageServ.getDatabase()});

    const doc = await firebaseServ.getDoc("data", "stats");
    const val = await doc.get("Retrieve");
    firebaseServ.modifyDoc("data", "stats", {
        Retrieve: val+1
    });
}

/**
 * Function to handle Add Package Page
 * @constructor
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next middleware function
 */
async function addPackages(req, res, next) {
    res.render("pkg_add.html", {db: await driverServ.getDatabase()});
}

/**
 * Function to handle Add Package Operation
 * @constructor
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next middleware function
 */
async function addPackagesHandler(req, res, next) {
    results = req.body;
    
    try {
        pkg = await packageServ.createPackage(results);
        await packageServ.addPackage(pkg);
        res.redirect("/33158312/daniel/packages");

        const doc = await firebaseServ.getDoc("data", "stats");
        const val = await doc.get("Create");
        firebaseServ.modifyDoc("data", "stats", {
            Create: val+1
        });
    } catch (error) {
        console.log(error.message);
        res.render("invalid.html");
    }
}

/**
 * Function to handle Remove Package Page
 * @constructor
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next middleware function
 */
function deletePackages(req, res, next) {
    res.render("pkg_del.html");
}

/**
 * Function to handle Remove Package Operation
 * @constructor
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next middleware function
 */
async function deletePackagesHandler(req, res, next) {
    id = req.query.package_id;

    try {
        if ((await packageServ.delPackageId(id)).deletedCount) {
            res.redirect("/33158312/daniel/packages");

            const doc = await firebaseServ.getDoc("data", "stats");
            const val = await doc.get("Delete");
            firebaseServ.modifyDoc("data", "stats", {
                Delete: val+1
            });
        } else {
            res.render("invalid.html");
        }
    } catch (error) {
        console.log(error.message);
        res.render("invalid.html");
    }
}

module.exports = {
    packagesList,
    addPackages,
    addPackagesHandler,
    deletePackages,
    deletePackagesHandler
}