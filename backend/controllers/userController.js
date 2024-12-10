/**
 * @author Daniel Truong <dtru0010@student.monash.edu>
 */

/**
 * User Controller Module
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
 * Function to handle Login Page
 * @constructor
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next middleware function
 */
async function login(req, res, next) {
    res.render("login.html");
}

/**
 * Function to handle Login Operation
 * @constructor
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next middleware function
 */
async function loginHandler(req, res, next) {
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
                res.redirect("/");
                validUser = true;
            }
        });
        if (validUser){
            return;
        }
        res.render("invalid.html");
    } catch (error) {
        res.render("invalid.html");
    }
}

/**
 * Function to handle Signup Page
 * @constructor
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next middleware function
 */
async function signup(req, res, next) {
    res.render("signup.html");
}

/**
 * Function to handle Signup Operation
 * @constructor
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next middleware function
 */
async function signupHandler(req, res, next){
    details = req.body;
    const username = details.username;
    const password = details.password;
    const conf_password = details.conf_password;

    try{
        if (!userServ.usernameValidation(username)) {
            res.render("invalid");
            return;
        }

        if (!userServ.passwordValidation(password)) {
            res.render("invalid");
            return;
        }

        if (password === conf_password) {
            await firebaseServ.createDoc({
                username: username,
                password: password
            }, "users");

            res.redirect("/33158312/daniel/users/login");
        } else {
            res.render("invalid.html");
        }

    } catch (error) {
        res.render("invalid.html");
    }
}

module.exports = {
    login,
    loginHandler,
    signup,
    signupHandler
}