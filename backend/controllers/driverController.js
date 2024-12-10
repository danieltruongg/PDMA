/**
 * @author Daniel Truong <dtru0010@student.monash.edu>
 */

/**
 * Driver Controller Module
 * @requires driverService
 * @requires firebaseService
 */

/**
 * Driver Service object
 * @const
 */
const driverServ = require("../services/driverService");

/**
 * Firebase Service object
 * @const
 */
const firebaseServ = require("../services/firebaseService");

/**
 * Function to handle List Drivers Page
 * @constructor
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next middleware function
 */
async function driversList(req, res, next) {
    res.render("drvr_view.html", {db: await driverServ.getDatabase()});

    const doc = await firebaseServ.getDoc("data", "stats");
    const val = await doc.get("Retrieve");
    firebaseServ.modifyDoc("data", "stats", {
        Retrieve: val+1
    });
}

/**
 * Function to handle Add Driver Page
 * @constructor
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next middleware function
 */
function addDrivers(req, res, next) {
    res.render("drvr_add.html");
}

/**
 * Function to handle Add Driver Operation
 * @constructor
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next middleware function
 */
async function addDriversHandler(req, res, next) {
    results = req.body;
    
    try {
        let driver = driverServ.createDriver(results);
        await driverServ.addDriver(driver);
        res.redirect("/33158312/daniel/drivers");
        
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
 * Function to handle Remove Driver Page
 * @constructor
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next middleware function
 */
function deleteDrivers(req, res, next) {
    res.render("drvr_del.html");
}

/**
 * Function to handle Remove Driver Operation
 * @constructor
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next middleware function
 */
async function deleteDriversHandler(req, res, next) {
    id = req.query.driver_id;
    try{
        if ((await driverServ.delDriverId(id)).deletedCount) {
            res.redirect("/33158312/daniel/drivers");

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

/**
 * Function to handle Filter Drivers by Department
 * @constructor
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next middleware function
 */
function driversDepartFilter(req, res, next) {
    res.render("drvr_depart.html");
}

/**
 * Function to handle List Drivers by Department Page
 * @constructor
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next middleware function
 */
async function driversDepartList(req, res, next) {
    drvrDepart = req.query.drvrDepart;

    try {
        let list = await driverServ.filterDriverDepartment(drvrDepart);
        if (!list) {
            res.render("invalid.html")
            return;
        }
        res.render("drvr_depart_view.html", {db: list, depart: drvrDepart});

        const doc = await firebaseServ.getDoc("data", "stats");
        const val = await doc.get("Retrieve");
        firebaseServ.modifyDoc("data", "stats", {
            Retrieve: val+1
        });
    } catch (error) {
        console.log(error.message);
        res.render("invalid.html");
    }
}

/**
 * Function to handle Remove Driver in Driver by Department Operation
 * @constructor
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next middleware function
 */
async function deleteDriversDepartHandler(req, res, next) {
    depart = req.body.drvrDepart;
    id = req.body.driverId;

    try{
        if (await driverServ.delDriverId(id)) {
            res.redirect(`/33158312/daniel/drivers/department_view?drvrDepart=${depart}`);

            const doc = await firebaseServ.getDoc("data", "stats");
            const val = await doc.get("Delete");
            firebaseServ.modifyDoc("data", "stats", {
                Delete: val+1
            });
        } else {
            res.render("invalid.html");
        }
    } catch (error) {
        console.log(error);
        res.render("invalid.html");
    }
}

module.exports = { 
    driversList, 
    addDrivers, 
    addDriversHandler, 
    deleteDrivers, 
    deleteDriversHandler,  
    driversDepartFilter, 
    driversDepartList, 
    deleteDriversDepartHandler
}