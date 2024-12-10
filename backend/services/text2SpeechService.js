const textToSpeech = require("@google-cloud/text-to-speech");
const client = new textToSpeech.TextToSpeechClient();

/**
 * Creates a request object for the text to speech
 * @constructor
 * @param {string} text - The text input to convert
 * @returns {object} - request object
 */
function createRequest(text) {
    let request = {
        input: {
            text: text
        },
        voice: {
            languageCode: "en-US",
            ssmlGender: "NEUTRAL"
        },
        audioConfig: {
            audioEncoding: "MP3"
        }
    }

    return request;
}

/**
 * Converts text into speech using Google Cloud Service Text to Speech
 * @constructor
 * @param {string} text - The text input  to convert
 * @returns {object} - the converted text into speech
 */
async function convert(text) {
   let request = createRequest(text);
   
   const [response] = await client.synthesizeSpeech(request);
   return response;
}

module.exports = {
    createRequest,
    convert
}