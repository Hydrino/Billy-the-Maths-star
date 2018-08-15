// This file will store all the constants

const numberOfQuestions = 5;
const randomNumberCeiling = 10;
const operators = ['+', '-', '*', '/'];
const operations = {
    '+': function (x, y) { return x + y },
    '-': function (x, y) { return x - y },
    '*': function (x, y) { return x * y },
    '/': function (x, y) {return x/y},
};
const consectiveWrongAnswerLimit = 3;

const frequentUserDaysThreshold = 5;

module.exports = {
    numberOfQuestions: numberOfQuestions,
    randomNumberCeiling: randomNumberCeiling,
    operators: operators,
    operations: operations,
    consectiveWrongAnswerLimit: consectiveWrongAnswerLimit,
    frequentUserDaysThreshold: frequentUserDaysThreshold
};