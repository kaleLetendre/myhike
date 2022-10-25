// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDmXV0jgRqxotVLUxqarphEVDbj0ek_M2Y",
    authDomain: "comp1800-2022-f3b5f.firebaseapp.com",
    projectId: "comp1800-2022-f3b5f",
    storageBucket: "comp1800-2022-f3b5f.appspot.com",
    messagingSenderId: "774065987035",
    appId: "1:774065987035:web:61abaadfaad2ed44e0dbfe"
  };
  
//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();