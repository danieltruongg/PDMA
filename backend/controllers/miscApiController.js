/**
 * @author Daniel Truong <dtru0010@student.monash.edu>
 */

/**
 * Miscellaneous API Controller Module
 * @requires firebaseService
 */

/**
 * Firebase Service object
 * @const
 */
const firebaseServ = require("../services/firebaseService");

/**
 * Function to handle API Statistics
 * @constructor
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next middleware function
 */
async function statsListApi(req, res, next) {
    try {
        const doc = await firebaseServ.getDoc("data", "stats");
        res.status(200).json(doc.data());

    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    statsListApi
}