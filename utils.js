const stringFunctions = require('./strings')
const constants = require('./constantValues')


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


function getCorrectAnswerResponse() {
    var index = getRandomInt(stringFunctions.correctResponses.length);
    return stringFunctions.correctResponses[index];
}

function getWrongAnswerResponse() {
    var index = getRandomInt(stringFunctions.wrongResponses.length);
    return stringFunctions.wrongResponses[index];
}

function getClosingMessage() {
    var index = getRandomInt(stringFunctions.closingMessages.length);
    return stringFunctions.closingMessages[index];
}

function getRandomOperator() {

    var index = getRandomInt(constants.operators.length);
    return constants.operators[index];
}


module.exports = {

    askQuestion: function (conv) {
 
        var operator = getRandomOperator();
        var result=0;
        var num1=0;
        var num2=0;


        if (operator === '/') {

            while (num1 === 0) {
                num1 = getRandomInt(constants.randomNumberCeiling);
            }

            while (num2 === 0) {
                num2 = getRandomInt(constants.randomNumberCeiling);
            }

            var mutliplyResult = num1 * num2;
  
            num2 = num1;
            num1 = mutliplyResult;        
           
        } else if (operator === '-') {

            while (num1 === 0) {
                num1 = getRandomInt(constants.randomNumberCeiling);
            }

            num2 = 10;

            while (num1 - num2 < 0) {
                num2 = getRandomInt(constants.randomNumberCeiling);
            }

        }else {
            num1 = getRandomInt(constants.randomNumberCeiling);
            num2 = getRandomInt(constants.randomNumberCeiling);
        }

        result = constants.operations[operator](num1, num2);

        conv.ask(stringFunctions.questionString(num1, num2,operator))

        return [num1, operator, num2, result]
    },

    congratulateUser: function (conv) {
        conv.close(getCorrectAnswerResponse())
    },

    motivateUser: function (conv) {
        conv.close(getWrongAnswerResponse())
    },

    repeatQuestion: function (conv, num1, num2,operator) {
        conv.ask(stringFunctions.questionString(num1, num2,operator))
    },

    endSession: function (conv) {
        conv.close(getClosingMessage())
    },

    askAnotherQuestion: function (conv, result) {

        conv.close(stringFunctions.cheerUpUser(result));
        var _result = this.askQuestion(conv);
        return _result;
        
    },

    showFrequentUserWelcomeMessage: function (conv) {
            conv.ask(stringFunctions.frequentUserResponse);
    },

    showNonFrequentUserWelcomeMessage: function (conv) {
        conv.ask(stringFunctions.nonFrequentUserResponse);
    }

}




