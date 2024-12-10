/**
 * @author Daniel Truong <dtru0010@student.monash.edu>
 */

/**
 * User API Controller Module
 * @requires userService
 * @requires firebaseService
 */

/**
 * User Service object
 * @const
 */
const userServ = require("../services/userService");

/**
 * Firebase Service object
 * @const
 */
const firebaseServ = require("../services/firebaseService");

/**
 * Function to handle API Login
 * @constructor
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next middleware function
 */
async function loginApi(req, res, next) {
    details = req.body;
    const username = details.username;
    const password = details.password;

    try {
        const users = await firebaseServ.getCol("users");
        let validUser = false;
        users.forEach(doc => {
            let data = doc.data();
            if (data.username === username && data.password === password) {
                req.app.locals.isAuthenticated = true;
                res.status(200).json({
                    "status": "Login Successful"
                });
                validUser = true;
            }
        });
        if (validUser){
            return;
        }
        res.status(400).json({
            "status": "Login Failed",
            "error": `Username/Password invalid or not found`
        });
    } catch (error) {
        res.status(500).json({
            "status": "Login Failed",
            "error": error.message
        });
    }
}

/**
 * Function to handle API Signup
 * @constructor
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next middleware function
 */
async function signupApi(req, res, next){
    details = req.body;
    const username = details.username;
    const password = details.password;
    const conf_password = details.confirm_password;

    try{
        if (!userServ.usernameValidation(username)) {
            res.status(400).json({
                "status": "Signup Failed",
                "error": `Username Invalid - Username must contain at least 6 alphanumeric characters`
            });
            return;
        }

        if (!userServ.passwordValidation(password)) {
            res.status(400).json({
                "status": "Signup Failed",
                "error": `Password Invalid - Password must be between 5-10 characters`
            });
            return;
        }

        if (password === conf_password) {
            await firebaseServ.createDoc({
                username: username,
                password: password
            }, "users");

            res.status(200).json({
                "status": "Signup Successful"
            });
        } else {
            res.status(400).json({
                "status": "Signup Failed",
                "error": `Entered passwords do not match`
            });
        }

    } catch (error) {
        res.status(500).json({
            "status": "Signup Failed",
            "error": error.message
        });
    }
}

module.exports = {
    loginApi,
    signupApi,
}