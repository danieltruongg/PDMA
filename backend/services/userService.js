/**
 * @author Daniel Truong <dtru0010@student.monash.edu>
 */

/**
 * User Service Module
 */

/**
 * Validate the specified username for signup
 * @constructor
 * @param {string} username - The user input of username
 * @returns {boolean} - validation passed or not
 */
function usernameValidation(username) {
    // check username length
    if (username.length < 6) {
        return false;
    }

    //check for any non-alphanumeric values
    let num = "0123456789"
    let uppalpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    let lowalpha = "abcdefghijklmnopqrstuvwxyz"
    for (let char of username) {
        if (!(num.includes(char)) && // numeric (0-9)
            !(uppalpha.includes(char)) && // upper alpha (A-Z)
            !(lowalpha.includes(char))) { // lower alpha (a-z)
            return false;
        }
    }

    return true;
}

/**
 * Validate the specified password for signup
 * @constructor
 * @param {string} password - The user input of password
 * @returns {boolean} - validation passed or not
 */
function passwordValidation(password) {
    // check password length
    if (5 > password.length || password.length > 10) {
        return false;
    }
    return true
}

module.exports = {
    usernameValidation,
    passwordValidation
}