/**
 * @author Daniel Truong <dtru0010@student.monash.edu>
 */

/**
 * Express application
 * @requires dotenv
 * @requires express
 * @requires http
 * @requires socket.io
 * @requires mongoose
 * @requires firebase-admin
 * @requires serviceAccount
 * @requires authWhitelist
 * @requires driverService
 * @requires packageService
 * @requires firebaseService
 * @requires text2SpeechService
 * @requires translationService
 * @requires aiService
 * @requires driverRouter
 * @requires packageRouter
 * @requires driverApiRouter
 * @requires packageApiRouter
 * @requires userRouter
 * @requires userApiRouter
 * @requires miscRouter
 * @requires miscApiRouter
 */

/**
 * dotenv module
 */
require('dotenv').config();

/**
 * Express module
 * @const
 */
const express = require('express');

/**
 * Mongoose module
 * @const
 */
const mongoose = require('mongoose');

/**
 * Firebase module
 * @const
 */
const firebase = require('firebase-admin');

/**
 * Firebase Service Account JSON
 * @const
 */
const serviceAccount = require('./service-account.json');

/**
 * Connect to the Firebase cloud database.
 * @function
 */
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount)
});
console.log("Successfully connected to cloud database");

/**
 * Authenticated User Whitelist Routes
 * @const
 */
const authWhitelist = require('./config/authWhitelist.js');

/**
 * Driver Service module
 * @const
 */
const driverServ = require("./services/driverService");

/**
 * Package Service module
 * @const
 */
const packageServ = require("./services/packageService");

/**
 * Firebase Service object
 * @const
 */
const firebaseServ = require("./services/firebaseService");

/**
 * Text to Speech Service module
 * @const
 */
const text2SpeechServ = require('./services/text2SpeechService.js');

/**
 * Tranlsation Service module
 * @const
 */
const translationServ = require("./services/translationService");

/**
 * Generative AI Service module
 * @const
 */
const aiServ = require("./services/aiService");

/**
 * Driver Router module
 * @const
 */
const driverRouter = require("./routers/driverRouter.js");

/**
 * Package Router module
 * @const
 */
const packageRouter = require("./routers/packageRouter.js");

/**
 * Driver API Router module
 * @const
 */
const driverApiRouter = require("./routers/driverApiRouter.js");

/**
 * Package API Router module
 * @const
 */
const packageApiRouter = require("./routers/packageApiRouter.js");

/**
 * User Router module
 * @const
 */
const userRouter = require("./routers/userRouter.js");

/**
 * User API Router module
 * @const
 */
const userApiRouter = require("./routers/userApiRouter.js");

/**
 * Miscellaneous Router module
 * @const
 */
const miscRouter = require("./routers/miscRouter.js");

/**
 * Miscellaneous API Router module
 * @const
 */
const miscApiRouter = require("./routers/miscApiRouter.js");

/**
 * Base URL
 * @const
 */
const BASE_URL = "/33158312/daniel";

/**
 * Base URL API Requests
 * @const
 */
const API_URL = `${BASE_URL}/api/v1`;

/**
 * Mongodb URL
 * @const
 */
const DB_URL = "mongodb://localhost:27017/PDMAdb"

/**
 * Connect to the MongoDB database.
 * @constructor
 */
async function connect() {
    await mongoose.connect(DB_URL);
    console.log("Successfully connected to database");
}
connect().catch((error) => {console.log(error)});

/**
 * Initialize statistics document in Firebase database
 * @constructor
 */
async function initializeStats() {
    const doc = await firebaseServ.getDoc("data", "stats");
    if (!(doc.exists)) {
        await firebaseServ.createDoc({
            Create: 0,
            Retrieve: 0,
            Update: 0,
            Delete: 0
        }, "data", "stats", );
    }
}
initializeStats().catch((error) => {console.log(error)});

/**
 * App instance
 * @const
 */
const app = express();

/**
 * Port number
 * @const
 */
const PORT = 8080;

/**
 * Server instance
 * @const
 */
const server = require('http').Server(app);

/**
 * Socket.io instance
 * @const
 */
const io = require('socket.io')(server);

/**
 * Set application to access Bootstrap files
 * @function
 * @param {Function} handlers - The handler function
 */
app.use(express.static("node_modules/bootstrap/dist/css"));

/**
 * Set application to access images
 * @function
 * @param {Function} handlers - The handler function
 */
app.use(express.static("./images"));

/**
 * Set application to parse urlencoded bodies
 * @function
 * @param {Function} handlers - The handler function
 */
app.use(express.urlencoded({extended: false}));

/**
 * Set application to parse json
 * @function
 * @param {Function} handlers - The handler function
 */
app.use(express.json());

/**
 * Set application to serve frontend static files for api routes
 * @function
 * @param {Function} handlers - The handler function
 */
app.use(express.static('../frontend/dist/frontend/browser'));

/**
 * Register template engine for the html extension
 * @function
 * @param {string} ext - The extension file
 * @param {*} fn - The function
 */
app.engine('html', require('ejs').renderFile);

/**
 * Set application to use engine on html files
 * @function
 * @param {string} setting - The setting
 * @param {*} val - Assigned val
 */
app.set('view engine', 'html');

/**
 * Setting Local User Auth variable
 * @var
 */
app.locals.isAuthenticated = false;

/**
 * Login Status Check Express Middleware
 * @function
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next middleware function
 */
app.use(function (req, res, next) {
    if (!(app.locals.isAuthenticated)) {
        for (let i=0; i<authWhitelist.length; i++){
            if (req.path.includes(authWhitelist[i])){
                if (req.path.includes(API_URL)) {
                    res.status(401).json({
                        "status": "Request Failed",
                        "error": "You must Sign Up/Log In before executing any features!"
                    });
                    return;
                } else {
                    res.redirect("/33158312/daniel/users/login");
                    return;
                }
            }
        }
    }
    next();
});

/**
 * Function to handle Home Page
 * @constructor
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next middleware function
 */
async function home(req, res, next) {
    res.render("index.html", {
        driverDb: await driverServ.getDatabase(), 
        packageDb: await packageServ.getDatabase()
    });
}

/**
 * Function to handle 404 Page
 * @constructor
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {Function} next - The next middleware function
 */
function pageNotFound(req, res, next) {
    res.render("404.html");
}

/**
 * Router serving all pages under /33158312/daniel/drivers
 * @name use/driverRouter
 * @function
 * @param {string} path - The URL path
 * @param {Function} handlers - Handler function for request at path
 */
app.use(`${BASE_URL}/drivers`, driverRouter);

/**
 * Router serving all pages under /33158312/daniel/packages
 * @name use/packageRouter
 * @function
 * @param {string} path - The URL path
 * @param {Function} handlers - Handler function for request at path
 */
app.use(`${BASE_URL}/packages`, packageRouter);

/**
 * Router serving all pages under /33158312/daniel/api/v1/drivers
 * @name use/driverApiRouter
 * @function
 * @param {string} path - The URL path
 * @param {Function} handlers - Handler function for request at path
 */
app.use(`${API_URL}/drivers`, driverApiRouter);

/**
 * Router serving all pages under /33158312/daniel/api/v1/packages
 * @name use/packageApiRouter
 * @function
 * @param {string} path - The URL path
 * @param {Function} handlers - Handler function for request at path
 */
app.use(`${API_URL}/packages`, packageApiRouter);

/**
 * Router serving all pages under /33158312/daniel/users
 * @name use/userRouter
 * @function
 * @param {string} path - The URL path
 * @param {Function} handlers - Handler function for request at path
 */
app.use(`${BASE_URL}/users`, userRouter);

/**
 * Router serving all pages under /33158312/daniel/api/v1/users
 * @name use/userApiRouter
 * @function
 * @param {string} path - The URL path
 * @param {Function} handlers - Handler function for request at path
 */
app.use(`${API_URL}/users`, userApiRouter);

/**
 * Router serving all pages under /33158312/daniel/
 * @name use/miscRouter
 * @function
 * @param {string} path - The URL path
 * @param {Function} handlers - Handler function for request at path
 */
app.use(`${BASE_URL}`, miscRouter);

/**
 * Router serving all pages under /33158312/daniel/api/v1/
 * @name use/miscRouter
 * @function
 * @param {string} path - The URL path
 * @param {Function} handlers - Handler function for request at path
 */
app.use(`${API_URL}`, miscApiRouter);

/**
 * Route serving Home Page
 * @name get/HomePage
 * @function
 * @param {string} path - The URL path
 * @param {Function} handlers - Handler function for request at path
 */
app.get("/", home);

/**
 * Route serving 404 Page
 * @name get/404Page
 * @function
 * @param {string} path - The URL path
 * @param {Function} handlers - Handler function for request at path
 */
app.get("*", pageNotFound);

io.on("connection", (socket) => {
    console.log("New connection made from client with ID: " + socket.id);

    socket.on("text2SpeechCall", async (text) => {
        let result = await text2SpeechServ.convert(text);
        io.sockets.emit("text2SpeechResult", result);
    });

    socket.on("translationCall", async (text, targetLang) => {
        let result = await translationServ.translation(text, targetLang);
        io.sockets.emit("translationResult", result);
    });

    socket.on("generativeAiCall", async (destinationInput) => {
        try {
            let destination = destinationInput;

            const spellCheck = await aiServ.spellingCheck(destinationInput);
            if (spellCheck != "True") {
                destination = spellCheck;
            }
            
            let distance = '';
            if (await aiServ.locationValidation(destination) == "True") {
            distance = await aiServ.calcDistFromMelb(destination);
            }

            io.sockets.emit("generativeAiResult", distance, destination);
        } catch (error) {
            console.log(error);
        }
    });
});

/**
 * Configure the port number
 * @name listen
 * @function
 * @param {number} port - Port number
 * @param {Function} callback - Express callback function
 */
server.listen(PORT, function () {
    console.log(`listening on port ${PORT}`);
});