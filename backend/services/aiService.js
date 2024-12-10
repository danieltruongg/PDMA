const { GoogleGenerativeAI } = require('@google/generative-ai');
const API_KEY = process.env.GEMINI_API_KEY;

const geminiConfig = {
    temperature: 0.9,
    topP: 1,
    topK: 1,
    maxOutputTokens: 4096,
};
const googleAi = new GoogleGenerativeAI(API_KEY);


const geminiModel = googleAi.getGenerativeModel({
    model: "gemini-pro",
    geminiConfig,
});

async function calcDistFromMelb(destination) {
    let prompt = `What is the distance between Melbourne and ${destination} in kilometers?`
    let {response} = await geminiModel.generateContent(prompt);
    const sentence = response.text();
    let sentenceArray = sentence.split(' ').filter(word => word !== '');

    let distance = '';
    sentenceArray.forEach((word, i) => {
        capWord = word.charAt(0).toUpperCase() + word.slice(1);
        if (capWord == "Kilometers" || capWord == "Kilometer" || capWord == "Km") {
            distance = sentenceArray[i-1];
        }
    });

    distance.replace(/[.""]/g, '');
    return distance;
}

async function locationValidation(location) {
    let prompt = `Is ${location} a real location on Earth? If it is, say true, if not say false.`
    let {response} = await geminiModel.generateContent(prompt);
    const sentence = response.text();
    let sentenceArray = sentence.split(' ').filter(word => word !== '');
    let correctWord = sentenceArray[0].replace(/[.""]/g, '');
    let capWord = correctWord.charAt(0).toUpperCase() + correctWord.slice(1);
    return capWord;
}

async function spellingCheck(word) {
    let prompt = `Check the spelling for ${word}. If spelt correctly say true, if not spell the correctly.`
    let {response} = await geminiModel.generateContent(prompt);
    const sentence = response.text();
    let sentenceArray = sentence.split(' ').filter(word => word !== '');
    let correctWord = sentenceArray[sentenceArray.length - 1].replace(/[.""()]/g, '');
    let capWord = correctWord.charAt(0).toUpperCase() + correctWord.slice(1);
    return capWord;
}

module.exports = {
    calcDistFromMelb,
    locationValidation,
    spellingCheck
}