/**
 * @author Daniel Truong <dtru0010@student.monash.edu>
 */

/**
 * Package Service Module
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
 * @returns {string} The package's unique generated id
 */
function generateId() {
    var currId = `P`

    //Generates a combination of two random uppercase letters
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let res = "";
    for (let i=0; i < 2; i++) {
        res += letters[Math.floor(Math.random() * letters.length)];
    }
    currId = currId + res + "-DT-";

    //Generates a combination of three random numbers
    res = "";
    for (let i=0; i < 3; i++) {
        res += Math.floor(Math.random() * 10);
    }
    let finId = currId + res

    return finId;
}

/**
 * Get the Package objects in the database.
 * @constructor
 * @returns {array} The array containing the objects in the database
 */
async function getDatabase() {
    return await Package.find().populate("driver_id");
}

/**
 * Creates the Package Model with user inputted data
 * @constructor
 * @param {object} details - Object parsed to contain user input
 * @returns {object} The Package Model
 */
async function createPackage(details) {
    let pkg = new Package({
        package_id: generateId(),
        package_title: details.package_title,
        package_weight: details.package_weight,
        package_destination: details.package_destination,
        description: details.description,
        package_createdAt: new Date(),
        isAllocated: (details.isAllocated=="true" || details.isAllocated==true) ? true : false,
        driver_id: (details.driver_id.length==10) ?
            await Driver.findOne({ "driver_id": details.driver_id }) : await Driver.findById(details.driver_id)
    });

    return pkg;
}

/**
 * Adds Package model into database and adds ID to Driver's assigned packages
 * @constructor
 * @param {object} package - The Package model
 */
async function addPackage(package) {
    await package.save()
    const driver = await Driver.findById(package.driver_id)
    driver.assigned_packages.push(package._id);
    await driver.save();
}

/**
 * Delete Package from database and remove package from related assigned packages list
 * @constructor
 * @param {string} id - The package id
 * @returns {object} The Package model
 */
async function delPackageId(id) {
    let filter;
    if (id.length == 10) {
        filter = { "package_id": id }
    } else {
        filter = { "_id": id }
    }

    pkg = await Package.findOne(filter);
    if (pkg) {
        const driver = await Driver.findOne({ "_id": pkg.driver_id });
        let pkgList = driver.assigned_packages
        pkgList.splice(pkgList.indexOf(pkg._id), 1);
        await driver.save()
    }
    result = await Package.deleteOne(filter);
    return result;
}

/**
 * Update the Package's details with user input
 * @constructor
 * @param {object} details - The user input
 * @returns {number} - Count of modified value
 */
async function updatePackageDet(details) {
    result = await Package.updateOne(
        {"_id": details.package_id}, 
        {$set: {package_destination: details.package_destination}},
        { runValidators: true }
    );

    return result.modifiedCount;
}

module.exports = {
    getDatabase,
    createPackage,
    addPackage,
    delPackageId,
    updatePackageDet
}