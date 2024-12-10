/**
 * @author Daniel Truong <dtru0010@student.monash.edu>
 */

/**
 * Driver Schema
 * @requires mongoose
 */

/**
 * Mongoose module
 * @const
 */
const mongoose = require("mongoose");

/**
 * Mongoose Schema
 * @function
 */
let driverSchema = mongoose.Schema({
    driver_id: String,

    driver_name: {
        type: String,
        required: true,
        validate: [{
            validator: (name) => {
                //check name length
                if (3 > name.length || name.length > 20) {
                    return false;
                }
            },
            message: "Length of name should be greater than 3 and less than 20 characters including."
        }, {
            validator: (name) => {
                //check for any non-alphabetical values
                let uppalpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                let lowalpha = "abcedfghijklmnopqrstuvwxyz"
                for (let char of name) {
                    if (!(uppalpha.includes(char)) &&
                        !(lowalpha.includes(char))) {
                    return false;
                    }
                }

                return true;
            },
            message: "Name should only contain alphabetical characters."
        }]
    },

    driver_department: {
        type: String,
        required: true,
        validate: {
            validator: (department) => {
                const departments = ["Food", "Furniture", "Electronic"]
                if (!(departments.includes(department))) {
                    return false;
                }

                return true;
            },
            message: "Given department does not exist."
        }
    },

    driver_licence: {
        type: String,
        required: true,
        validate: [{
            validator: (licence) => {
                // check licence length
                if (licence.length != 5) {
                    return false;
                }

                return true;
            },
            message: "Length of licence should be equal to 5 characters."
        }, {
            validator: (licence) => {
                //check for any non-alphanumeric values
                let num = "0123456789"
                let uppalpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                let lowalpha = "abcdefghijklmnopqrstuvwxyz"
                for (let char of licence) {
                    if (!(num.includes(char)) && // numeric (0-9)
                        !(uppalpha.includes(char)) && // upper alpha (A-Z)
                        !(lowalpha.includes(char))) { // lower alpha (a-z)
                        return false;
                    }
                }

                return true;
            },
            message: "Licence should only contain alphanumeric characters"
        }]
    },

    driver_isActive: {
        type: Boolean,
        required: true
    },
    
    driver_createdAt: Date,

    assigned_packages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Package"
    }]
});

module.exports = mongoose.model('Driver', driverSchema);