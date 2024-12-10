/**
 * @author Daniel Truong <dtru0010@student.monash.edu>
 */

/**
 * Package Schema
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
let packageSchema = mongoose.Schema({
    package_id: String,

    package_title: {
        type: String,
        required: true,
        validate: [{
            validator: (title) => {
                //check for length
                if (title.length < 3 || title.length > 15) {
                    return false;
                }
                
                return true;
            },
            message: "Length of title should be greater than 3 and less than 15 characters including."
        }, {
            validator: (title) => {
                //check for any non-alphanumeric values
                let num = "0123456789"
                let uppalpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                let lowalpha = "abcdefghijklmnopqrstuvwxyz"
                for (let char of title) {
                    if (!(num.includes(char)) && // numeric (0-9)
                        !(uppalpha.includes(char)) && // upper alpha (A-Z)
                        !(lowalpha.includes(char))) { // lower alpha (a-z)
                        return false;
                    }
                }
                
                return true;
            },
            message: "Title should only contain alphanumeric characters."
        }]
    },

    package_weight: {
        type: Number,
        required: true,
        validate: {
            validator: (weight) => {
                if (weight <= 0) {
                    return false;
                }
                return true;
            },
            message: "Weight should be greater than zero"
        }
    },

    package_destination: {
        type: String,
        required: true,
        validate: [{
            validator: (destination) => {
                //check for length
                if (destination.length < 5 || destination.length > 15) {
                    return false;
                }

                return true;
            },
            message: "Length of destination should be greater than 5 and less than 15 characters including."
        }, {
            validator: (destination) => {
                //check for any non-alphanumeric values
                let num = "0123456789"
                let uppalpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                let lowalpha = "abcdefghijklmnopqrstuvwxyz"
                for (let char of destination) {
                    if (!(num.includes(char)) && // numeric (0-9)
                        !(uppalpha.includes(char)) && // upper alpha (A-Z)
                        !(lowalpha.includes(char))) { // lower alpha (a-z)
                        return false;
                    }
                }

                return true;
            },
            message: "Destination should only contain alphanumeric characters."
        }]
    },

    description: {
        type: String,
        validate: {
            validator: (description) => {
                return 0 <= description <= 30;
            },
            message: "Length of description should be greater than 0 and less than 30 including."
        }
    },

    package_createdAt: Date,

    isAllocated: {
        type: Boolean,
        required: true
    },

    driver_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Driver",
        required: true
    }
});

module.exports = mongoose.model('Package', packageSchema);