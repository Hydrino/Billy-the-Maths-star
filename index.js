
const utils = require('./utils');
const strings = require('./strings');
const constants = require('./constantValues');

const functions = require('firebase-functions');
const { dialogflow } = require('actions-on-google');
const app = dialogflow({ debug: true });

var correctAnswersCount = 0;
var currentQuestionOperand1 = 0;
var currentQuestionOperator = '';
var currentQuestionOperand2 = 0;
var currentQuestionResult = 0;


function updateParams(result) {
    currentQuestionOperand1 = result[0];
    currentQuestionOperator = result[1];
    currentQuestionOperand2 = result[2];
    currentQuestionResult = result[3];
}

app.intent('Welcome', conv => {

    var lastSeenDate = conv.user.last.seen;

    if (lastSeenDate) {

        var lastSeenMillis = lastSeenDate.valueOf();
        var currentTimeMillis = Date.now();
        var daysElapsed = Math.trunc((currentTimeMillis - lastSeenMillis) / (1000 * 60 * 60 * 24));
        console.log(lastSeenMillis.toString());
        console.log(currentTimeMillis.toString());
        console.log(daysElapsed.toString());

        if (daysElapsed >= constants.frequentUserDaysThreshold) {
            utils.showNonFrequentUserWelcomeMessage(conv);
        } else {
            utils.showFrequentUserWelcomeMessage(conv);
        }

    } else {
        utils.showNonFrequentUserWelcomeMessage(conv);
    }

});


// when user says yes to the welcome intent
app.intent('WelcomeYes', conv => {

    // tell that we are gonna ask questions
    conv.close(strings.welcomeYesResponse);

    // now ask the question
    var result = utils.askQuestion(conv);

    // update the params
    updateParams(result);

});

// when user says an answer
app.intent('CheckAnswer', (conv, { number }) => {

    if (parseInt(number) === currentQuestionResult) {

        correctAnswersCount++;
        conv.data.consectiveWrongAnswerCount = 0;

        utils.congratulateUser(conv);

        if (correctAnswersCount === constants.numberOfQuestions) {

            // seems that this value is not automatically reset to zero if user calls Billy again after closing
            correctAnswersCount = 0;
            utils.endSession(conv);
            return;
        }

        // ask the next question
        var result = utils.askQuestion(conv);

        // update the params
        updateParams(result);

    } else {

        if (conv.data.consectiveWrongAnswerCount === '') {
            conv.data.consectiveWrongAnswerCount = 1;
        }else {
            conv.data.consectiveWrongAnswerCount = conv.data.consectiveWrongAnswerCount + 1;
        }

        if (conv.data.consectiveWrongAnswerCount === constants.consectiveWrongAnswerLimit) {

            conv.data.consectiveWrongAnswerCount = 0;
            var _result = utils.askAnotherQuestion(conv, currentQuestionResult);
            updateParams(_result);
            return;
        }

        utils.motivateUser(conv);

        // ask them one more time
        utils.repeatQuestion(conv, currentQuestionOperand1, currentQuestionOperand2,currentQuestionOperator);
    }

});

exports.request = functions.https.onRequest(app);

