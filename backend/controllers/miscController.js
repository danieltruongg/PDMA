/**
 * @author Daniel Truong <dtru0010@student.monash.edu>
 */

/**
 * Miscellaneous Controller Module
 * @requires firebaseService
 */

/**
 * Firebase Service object
 * @const
 */
const firebaseServ = require("../services/firebaseService");

/**
 * Function to handle Statistics Page
 * @constructor
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next middleware function
 */
async function statsList(req, res, next) {
    const doc = await firebaseServ.getDoc("data", "stats");
    res.render("statistics.html", { data: doc.data() });
}

module.exports = {
    statsList
}