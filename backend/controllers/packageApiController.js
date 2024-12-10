/**
 * @author Daniel Truong <dtru0010@student.monash.edu>
 */

/**
 * Package API Controller Module
 * @requires packageService
 * @requires firebaseService
 */

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
 * Function to handle API List Packages
 * @constructor
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next middleware function
 */
async function packagesListApi(req, res, next) {
    try {
        const list = await packageServ.getDatabase()
        res.status(200).json(list);

        const doc = await firebaseServ.getDoc("data", "stats");
        const val = await doc.get("Retrieve");
        firebaseServ.modifyDoc("data", "stats", {
            Retrieve: val+1
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

/**
 * Function to handle API Add Package
 * @constructor
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next middleware function
 */
async function addPackageApi(req, res, next) {
    details = req.body;

    try{
        let pkg = await packageServ.createPackage(details);
        await packageServ.addPackage(pkg);
        res.status(200).json({
            "id": pkg._id,
            "package_id": pkg.package_id
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
 * Function to handle API Remove Package
 * @constructor
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next middleware function
 */
async function deletePackageApi(req, res, next) {
    id = req.params.package_id;
    try{
        const result = await packageServ.delPackageId(id);
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
 * Function to handle API Update Package
 * @constructor
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next middleware function
 */
async function updatePackageApi(req, res, next) {
    filter = req.body;

    try {
        if (await packageServ.updatePackageDet(filter)) {
            res.status(200).json({
                "status": "Package updated successfully"
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
    packagesListApi,
    addPackageApi,
    deletePackageApi,
    updatePackageApi
}