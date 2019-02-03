/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const {WebhookClient} = require('dialogflow-fulfillment');
const https = require('https');

process.env.DEBUG = 'dialogflow:*'; // enables lib debugging statements
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });

  /* Given  */
  function writeToDb (agent) {
    // Get parameter from Dialogflow with the string to add to the database
    const databaseEntry = agent.parameters.databaseEntry;

    // Get the database collection 'dialogflow' and document 'agent' and store
    // the document  {entry: "<value of database entry>"} in the 'agent' document
    const dialogflowAgentRef = db.collection('dialogflow').doc('agent');
    return db.runTransaction(t => {
      t.set(dialogflowAgentRef, {entry: databaseEntry});
      return Promise.resolve('Write complete');
    }).then(doc => {
      agent.add(`Wrote "${databaseEntry}" to the Firestore database.`);
      return null; 
    }).catch(err => {
      console.log(`Error writing to Firestore: ${err}`);
      agent.add(`Failed to write "${databaseEntry}" to the Firestore database.`);
    });
  }

  function readFromDb (agent) {
    // Get the database collection 'dialogflow' and document 'agent'
    const dialogflowAgentDoc = db.collection('dialogflow').doc('agent');

    // Get the value of 'entry' in the document and send it to the user
    return dialogflowAgentDoc.get()
      .then(doc => {
        if (!doc.exists) {
          agent.add('No data found in the database!');
        } else {
          agent.add(doc.data().entry);
        }
        return Promise.resolve('Read complete');
      }).catch(() => {
        agent.add('Error reading entry from the Firestore database.');
        agent.add('Please add a entry to the database first by saying, "Write <your phrase> to the database"');
      });
  }

  /* End of Given */

  function getMessages (agent) {
    // Get the database collection 'dialogflow' and document 'agent'
    const dialogflowAgentDoc = db.collection('messages').doc('Test');
    const userList = db.collection('users');
    console.log(userList);

    // Get the value of 'entry' in the document and send it to the user
    return dialogflowAgentDoc.get()
      .then(doc => {
        if (!doc.exists) {
          agent.add('No data found in the database!');
        } else {
          agent.add(doc.data().message);
        }
        return Promise.resolve('Read complete');
      }).catch((err) => {
        //console.log(err);
        agent.add(err);
        agent.add('Error reading entry from the Firestore database.');
        agent.add('Please add a entry to the database first by saying, "Write <your phrase> to the database"');
      });
  }

  function getChores (agent) {
    // Get the database collection 'dialogflow' and document 'agent'
    const dialogflowAgentDoc = db.collection('messages').doc('Test');

    // Get the value of 'entry' in the document and send it to the user
    return dialogflowAgentDoc.get()
      .then(doc => {
        if (!doc.exists) {
          agent.add('No data found in the database!');
        } else {
          agent.add(doc.data().message);
        }
        return Promise.resolve('Read complete');
      }).catch((err) => {
        //console.log(err);
        agent.add(err);
        agent.add('Error reading entry from the Firestore database.');
        agent.add('Please add a entry to the database first by saying, "Write <your phrase> to the database"');
      });
  }

  function addMessages (agent) {
     // Get parameter from Dialogflow with the string to add to the database
    
     const databaseName = agent.parameters.name
     const databaseEntry = agent.parameters.message
    //const userList = db.collection('users').doc();
    const userList = db.collection('users')
    var found = 0; 
    userList.get()
    .then(snapshot => {
      var userid = null; 
      snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        console.log("CHECKING ", databaseName, "WITH",  doc.data().name);
        if(databaseName === doc.data().name){
          userid = doc.id;
          return doc.id; //TODO: RETURN SUCCESSFUL PROMISE
        }
        console.log("AFTER IF STATEMENT");
      });
      // eslint-disable-next-line no-throw-literal
      return userid;
    })
    .catch(err => {
      console.log('Error getting documents', err);
    })
    .then((userId) => {
      /* Adding the item to the database */
      console.log(userId); 
      const dialogflowAgentRef = db.collection('users').doc(userId).collection("messages").add({
        message: databaseEntry
      });
      return null;

    }).catch(err => {
      console.log("Error", err); 
    });

  }

  function addChores (agent) {
    // Get the database collection 'dialogflow' and document 'agent'
    const dialogflowAgentDoc = db.collection('messages').doc('Test');

    // Get the value of 'entry' in the document and send it to the user
    return dialogflowAgentDoc.get()
      .then(doc => {
        if (!doc.exists) {
          agent.add('No data found in the database!');
        } else {
          agent.add(doc.data().message);
        }
        return Promise.resolve('Read complete');
      }).catch((err) => {
        //console.log(err);
        agent.add(err);
        agent.add('Error reading entry from the Firestore database.');
        agent.add('Please add a entry to the database first by saying, "Write <your phrase> to the database"');
      });
  }

  function removeMessages (agent) {
    // Get the database collection 'dialogflow' and document 'agent'
    const dialogflowAgentDoc = db.collection('messages').doc('Test');

    // Get the value of 'entry' in the document and send it to the user
    return dialogflowAgentDoc.get()
      .then(doc => {
        if (!doc.exists) {
          agent.add('No data found in the database!');
        } else {
          agent.add(doc.data().message);
        }
        return Promise.resolve('Read complete');
      }).catch((err) => {
        //console.log(err);
        agent.add(err);
        agent.add('Error reading entry from the Firestore database.');
        agent.add('Please add a entry to the database first by saying, "Write <your phrase> to the database"');
      });
  }

  function removeChores (agent) {
    // Get the database collection 'dialogflow' and document 'agent'
    const dialogflowAgentDoc = db.collection('messages').doc('Test');

    // Get the value of 'entry' in the document and send it to the user
    return dialogflowAgentDoc.get()
      .then(doc => {
        if (!doc.exists) {
          agent.add('No data found in the database!');
        } else {
          agent.add(doc.data().message);
        }
        return Promise.resolve('Read complete');
      }).catch((err) => {
        //console.log(err);
        agent.add(err);
        agent.add('Error reading entry from the Firestore database.');
        agent.add('Please add a entry to the database first by saying, "Write <your phrase> to the database"');
      });
  }

  // Map from Dialogflow intent names to functions to be run when the intent is matched
  let intentMap = new Map();
  intentMap.set('ReadFromFirestore', readFromDb);
  intentMap.set('WriteToFirestore', writeToDb);
  intentMap.set('getMessages', getMessages);
  intentMap.set('getChores', getChores);
  intentMap.set('addMessages', addMessages);
  intentMap.set('addChores', addChores);
  intentMap.set('removeMessages', removeMessages);
  intentMap.set('removeChores', removeChores);
  agent.handleRequest(intentMap);
});
