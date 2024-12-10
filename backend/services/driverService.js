/**
 * @author Daniel Truong <dtru0010@student.monash.edu>
 */

/**
 * Driver Service Module
 * @requires Driver
 * @requires Package
 */

/**
 * Driver Model
 * @const
 */
const Driver = require("../models/driver");

/**
 * Package Model
 * @const
 */
const Package = require("../models/package");

/**
 * Generates ID.
 * @constructor
 * @returns {string} The driver's generated unique id.
 */
function generateId() {
    var currId = "D";

    //Generates a combination of two random numbers
    let res = "";
    for (let i=0; i < 2; i++) {
        res += Math.floor(Math.random() * 10);
    }
    currId = currId + res + "-33-";
    
    //Generates a combination of three random uppercase letters
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    res = "";
    for (let i=0; i < 3; i++) {
        res += letters[Math.floor(Math.random() * letters.length)];
    }

    let finId = currId + res;
    return finId;
}

/**
 * Get the Driver objects in the database.
 * @constructor
 * @returns {array} The array containing the objects in the database
 */
async function getDatabase() {
    return await Driver.find().populate("assigned_packages");
}

/**
 * Creates the Driver Model with user inputted data
 * @constructor
 * @param {object} details - Object parsed to contain user input
 * @returns {object} The Driver Model
 */
function createDriver(details) {
    let driver = new Driver({
        driver_id: generateId(),
        driver_name: details.driver_name,
        driver_department: details.driver_department,
        driver_licence: details.driver_licence,
        driver_isActive: (details.driver_isActive=="true" || details.driver_isActive==true) ? true : false,
        driver_createdAt: new Date()
    });

    return driver
}

/**
 * Adds Driver model into database
 * @constructor
 * @param {object} driver - The Driver model
 */
async function addDriver(driver) {
    await driver.save();
}

/**
 * Delete Driver from database and remove all assigned packages
 * @constructor
 * @param {string} id - The driver id
 * @returns {object} The Driver model
 */
async function delDriverId(id) {
    let filter;
    if (id.length == 10) {
        filter = { "driver_id": id }
    } else {
        filter = { "_id": id }
    }

    driver = await Driver.findOne(filter);
    if (driver) {
        let pkgList = driver.assigned_packages;
        pkgList.forEach( async function (pkg) {
            await Package.deleteOne({ "_id": pkg });
        });
    }
    result = await Driver.deleteOne(filter);
    return result;
}

/**
 * Filters the Driver database to show based on department
 * @constructor
 * @param {string} department - The department to filter by
 * @returns {array} The list of Drivers based on department
 */
async function filterDriverDepartment(department) {
    const departList = ["Food", "Furniture", "Electronic"];
    if (!(departList.includes(department))) {
        return false;
    }

    let docs = await Driver.find({ "driver_department": department });
    return docs;
}

/**
 * Update the Driver's details with user input
 * @constructor
 * @param {object} details - The user input
 * @returns {number} - Count of modified value
 */
async function updateDriverDet(details) {
    result = await Driver.updateOne(
        {"_id": details.id}, 
        {$set: {driver_licence: details.driver_licence, driver_department: details.driver_department}}, 
        { runValidators: true }
    );
    
    return result.modifiedCount;
}

module.exports = {
    getDatabase,
    createDriver,
    addDriver,
    delDriverId,
    filterDriverDepartment,
    updateDriverDet
}