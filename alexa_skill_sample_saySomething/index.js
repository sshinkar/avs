/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
require('ssl-root-cas').inject();
const Alexa = require('alexa-sdk');
const https = require('https');
const request = require('sync-request');
//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1'; // replace this with your skill ID.

const SKILL_NAME = 'YOUR_SKILL_NAME';
const GET_NAME = "What is your name? ";
const LAUNCH_MESSAGE = 'Hello,You can ask me to say your name.';
const HELP_MESSAGE = 'Hello,You can ask me to say your name';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';
const GREETING_MESSAGE = '';

//=========================================================================================================================================
//TODO: Replace this data with your own.  You can find translations of this data at http://github.com/alexa/skill-sample-node-js-fact/data
//=========================================================================================================================================
const greetMessageArr = [
    'Hello,',
    'Hi,',
];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const handlers = {
    'LaunchRequest': function () {

        const greetMessageIndex = Math.floor(Math.random() * greetMessageArr.length);
        const greetMessage = greetMessageArr[greetMessageIndex];
        const speechOutput = greetMessage;

        this.response.cardRenderer(SKILL_NAME, greetMessage);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },

    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },

    'SaySomethingIntent': function () {

      console.log('-----------------START SayHelloIntent-----------------');

      var url = 'http://demo5955794.mockable.io/saySomething'
      var options = {
        method: 'get',
        json: true,
        async: false,
        url: url
      }

      var message = "";
      var res = request('GET', url, options);
      console.log("res.getBody()----------------------", res.getBody());
      var response = JSON.parse(res.getBody('utf8'));
      console.log("res.getBody()----------------------", response.message);
      message = response.message;
      this.response.speak(message);
      this.emit(':responseReady');
      console.log('-----------------END SayHelloIntent-----------------');
    },

    'AskNameIntent': function () {
      this.emit(':ask', GET_NAME);
    },

    'SayNameIntent': function () {
      const name = this.event.request.intent.slots.name.value;
      const greetMessageIndex = Math.floor(Math.random() * greetMessageArr.length);
      const greetMessage = greetMessageArr[greetMessageIndex];
      const speechOutput = greetMessage;

      this.response.speak(greetMessage + ' ' + name + '. How are you?');
      this.emit(':responseReady');
    },

};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
