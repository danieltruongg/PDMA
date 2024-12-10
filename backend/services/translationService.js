const translate = require('@google-cloud/translate').v2;
const client = new translate.Translate();

/**
 * Translate the text to target language using Google Cloud Service Translation (Basic)
 * @constructor
 * @param {string} text - The text input to translate
 * @param {string} target - The target language to translate into
 * @returns {string} - The translated text
 */
async function translation(text, targetLang) { 
    const [translations] = await client.translate(text, targetLang);
    return translations;
}

module.exports = {
    translation
}

