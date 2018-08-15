const constants = require('./constantValues');

const nonFrequentUserResponse = "Hey there! I am Billy, the maths star. And together we will discover how fun maths can be. Shall we start?";
const frequentUserResponse = "Hello, I am Billy, the maths star! Shall we start your maths session?";

const welcomeYesResponse = `<speak>I am going to ask you <say-as interpret-as="cardinal">${constants.numberOfQuestions}</say-as> questions. Let's begin!</speak>`;


const correctResponses = ["That is correct! You are a genius!"
    , "That is the right answer! Well done."
    , "That is absolutely correct!"
    ,"Terrific! That is the right answer."];

const wrongResponses = ["Oops! You are close. Let's give it another try."
    , "That is the wrong answer. Let's try one more time.",
    "It is the wrong answer. No problem, let's try again."];

const closingMessages = ["Wow! You have answered all the questions correctly. I am impressed by your smartness. Let's catch up again later. Bye!"];

const operatorString = {

    '+': 'plus',
    '-': 'minus',
    '/': 'divided by',
    '*': 'multiplied by'
};


module.exports = {
    correctResponses: correctResponses,
    wrongResponses: wrongResponses,
    welcomeYesResponse: welcomeYesResponse,
    closingMessages: closingMessages,
    nonFrequentUserResponse: nonFrequentUserResponse,
    frequentUserResponse: frequentUserResponse,

    questionString: function (num1, num2, operator) {
        const operationString = operatorString[operator];
        ssml = `<speak>What is <say-as interpret-as="cardinal">${num1}</say-as> <sub alias="${operationString}">${operator}</sub> <say-as interpret-as="cardinal">${num2}</say-as>?</speak>`;
        return ssml;
    },

    cheerUpUser: function (result) {
        var response = `Seems like this question is too difficult. The answer is ${result}. No problem! I will ask another question for you.`;
        return response;
    }

};