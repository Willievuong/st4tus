const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
exports.getUser = functions.https.onRequest((request, response) => {
    
   
    //var result = db.collection('users').doc('user1');
    //var result = db.collection('users').doc();
    var userID;
    var IDs = [];
    var chores = []
    var messages = []
    var result = null
    var arrayName = []
    db.collection('users').get()
    .then((snapshot) => 
    {
      snapshot.forEach((doc) => 
      {
          //console.log("Check spot 1")
        console.log(doc.id, '=>', doc.data().name);
        arrayName.push(doc.data().name);
      IDs.push(doc.id)
      //console.log("THE ARRAY: ", IDs);
      });
      return IDs;
      //console.log("Check spot 2")
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    })
    .then((IDsArray) => {
        //console.log("Check spot 3")
        console.log(IDsArray[0])
        console.log(IDsArray)
        // const dialogflowAgentRef = db.collection('users').doc(IDs[0]).collection("messages").add({
        //     message: databaseEntry
        // })
        
        var result = IDs
        //response.send(result);
        return null
    }).catch(err => {
        console.log("Error", err)
    })
    .then((empty) => { 
        console.log("Check spot 4")
        //console.log(collection.data().name)
        for(var i = 0; i < IDs.length; i++) {

            db.collection('users').doc(IDs[i]).collection('chores').get().then((snapshot) => {
                snapshot.forEach((doc) => {
                    chores.push(doc.data().chore)
                    console.log(doc.data().chore)
                })
                
                console.log("Check spot 7")
            }).catch((err) => {console.log(err)})
 
            db.collection('users').doc(IDs[i]).collection('messages').get().then((snapshot) => {
                snapshot.forEach( doc => {
                    console.log("Check spot 6")
                    messages.push(doc.data().message)
                    //console.log(doc.data().message)
                })
                var finalResult = {
                IDs, 
                chores, 
                messages,
            }
                response.send(finalResult)  
            }).catch( err => {console.log(err)})
            
            
    
        }
        
    }).catch( err => {
        console.log("Error", err)
    });
});



