/**
 * @author Daniel Truong <dtru0010@student.monash.edu>
 */

/**
 * Firebase Service Module
 * @requires firebase-admin
 */

/**
 * Firebase module
 * @const
 */
const firebase = require('firebase-admin');

/**
 * Firebase cloud database
 * @const
 */
const db = firebase.firestore();

/**
 * Creates a new document in specified collection - capable of creating a new collection
 * @constructor
 * @param {object} data - JSON object containing the data to be saved
 * @param {string} colName - Collection Name
 * @param {string} docName - Document Name
 * @returns {Promise} - Firebase Promise
 */
async function createDoc(data, colName, docName=undefined) {
    if (docName === undefined) {
        return await db.collection(colName).doc().set(data);
    }
    return await db.collection(colName).doc(docName).set(data);
}

/**
 * Gets a snapshot of specified collection containing all documents
 * @constructor
 * @param {string} colName - Collection Name
 * @returns {Promise} - Firebase Promise
 */
async function getCol(colName) {
    return await db.collection(colName).get();
}

/**
 * Gets a snapshot of specified document
 * @constructor
 * @param {string} docName - Document Name
 * @returns {Promise} - Firebase Promise
 */
async function getDoc(colName, docName) {
    return await db.collection(colName).doc(docName).get();
}

/**
 * Modifies a specified document in the specified collection with the given data
 * @constructor
 * @param {object} data - JSON object containing the data to be saved
 * @param {string} colName - Collection Name
 * @param {string} docName - Document Name
 * @returns {Promise} - Firebase Promise
 */
async function modifyDoc(colName, docName, data) {
    return await db.collection(colName).doc(docName).update(data) ;
}

module.exports = {
    createDoc,
    getCol,
    getDoc,
    modifyDoc
}