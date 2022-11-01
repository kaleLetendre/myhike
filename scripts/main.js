function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid);
            console.log(user.displayName);
            user_Name = user.displayName;

            //method #1:  insert with html only
            //document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
            //method #2:  insert using jquery
            $("#name-goes-here").text(user_Name); //using jquery

        } else {
            // No user is signed in.
        }
    });
}

function readQuote() {
    db.collection("quotes").doc("tuesday")                                                      //name of the collection and documents should matach excatly with what you have in Firestore
      .onSnapshot(tuesdayDoc => {                                                               //arrow notation
           console.log("current document data: " + tuesdayDoc.data());                          //.data() returns data object
           document.getElementById("quote-goes-here").innerHTML = tuesdayDoc.data().quote;      //using javascript to display the data on the right place
           
           //Here are other ways to access key:value data fields
           //$('#quote-goes-here').text(tuesdayDoc.data().quote);                                       //using jquery object dot notation
           //$("#quote-goes-here").text(tuesdayDoc.data()["quote"]);                                    //using json object indexing
      })
}

function writeHikes() {
    //define a variable for the collection you want to create in Firestore to populate data
    var hikesRef = db.collection("hikes");

    hikesRef.add({
                      code:"BBY01",
        name: "Hike on the moon",    //replace with your own city?
        city: "moon colony",
        province: "Albategnius",
        level: "Death",
        length: "131",
        details: "dont do this hike",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  
    });
    hikesRef.add({
                      code:"AM01",
        name: "Mount MacFarlane",    //replace with your own city?
        city: "Chilliwack",
        province: "BC",
        level: "medium",
        length: "17",
        details: "very nice views uptop ount the north and south peaks and cheam range",
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
   });
   hikesRef.add({
                      code:"NV01",
        name: "Flora Lindeman Greendop loop",    //replace with your own city?
        city: "Chilliwack",
        province: "BC",
        level: "hard",
        length: "18.5",
        details: "start early in the morning, the forest gets very dark",
        last_updated: firebase.firestore.Timestamp.fromDate(new Date("November 1, 2022"))
   });
}

function displayCards(collection) {
    let cardTemplate = document.getElementById("hikeCardTemplate");

    db.collection(collection).get()
        .then(snap => {
            //var i = 1;  //if you want to use commented out section
            snap.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;        // get value of the "name" key
                var details = doc.data().details;   // get value of the "details" key
								var hikeID = doc.data().code;    //get unique ID to each hike to be used for fetching right image
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-image').src = `./images/${hikeID}.jpg`; //Example: NV01.jpg

                //give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery
                document.getElementById(collection + "-go-here").appendChild(newcard);
                //i++;   //if you want to use commented out section
            })
        })
}

displayCards("hikes");
//writeHikes();
readQuote();
insertName(); //run the function