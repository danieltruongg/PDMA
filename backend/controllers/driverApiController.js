/**
 * @author Daniel Truong <dtru0010@student.monash.edu>
 */

/**
 * Driver API Controller Module
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
 * Function to handle API List Drivers
 * @constructor
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next middleware function
 */
async function driversListApi(req, res, next) {
    try {
        const list = await driverServ.getDatabase();
        res.status(200).json(list);

        const doc = await firebaseServ.getDoc("data", "stats");
        const val = await doc.get("Retrieve");
        firebaseServ.modifyDoc("data", "stats", {
            Retrieve: val+1
        });
    } catch (error) {
        res.status(400).send(error.message)
    }
}

/**
 * Function to handle API Add Driver
 * @constructor
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next middleware function
 */
async function addDriverApi(req, res, next) {
    details = req.body;

    try{
        let driver = driverServ.createDriver(details);
        await driverServ.addDriver(driver);
        res.status(200).json({
            "id": driver._id,
            "driver_id": driver.driver_id
        });

        const doc = await firebaseServ.getDoc("data", "stats");
        const val = await doc.get("Create");
        firebaseServ.modifyDoc("data", "stats", {
            Create: val+1
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

/**
 * Function to handle API Remove Driver
 * @constructor
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next middleware function
 */
async function deleteDriverApi(req, res, next) {
    id = req.query.driver_id;
    try{
        const result = await driverServ.delDriverId(id);
        res.status(200).json(result);

        const doc = await firebaseServ.getDoc("data", "stats");
        const val = await doc.get("Delete");
        firebaseServ.modifyDoc("data", "stats", {
            Delete: val+1
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

/**
 * Function to handle API Update Driver
 * @constructor
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next middleware function
 */
async function updateDriverApi(req, res, next) {
    filter = req.body;

    try {
        if (await driverServ.updateDriverDet(filter)) {
            res.status(200).json({
                "status": "Driver updated successfully"
            });

            const doc = await firebaseServ.getDoc("data", "stats");
            const val = await doc.get("Update");
            firebaseServ.modifyDoc("data", "stats", {
                Update: val+1
            });
        } else {
            res.status(400).json({
                "status": "ID not found"
            });
        }
        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    driversListApi,
    addDriverApi,
    deleteDriverApi,
    updateDriverApi
}