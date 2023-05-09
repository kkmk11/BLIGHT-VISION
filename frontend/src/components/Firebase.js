import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import "firebase/compat/database";

const firebaseConfig = {
    apiKey: "AIzaSyDm5OgdMMQwHiwmdG1LClka1Nt5IKKar8U",
    authDomain: "blight-vision.firebaseapp.com",
    projectId: "blight-vision",
    storageBucket: "blight-vision.appspot.com",
    messagingSenderId: "998919818609",
    appId: "1:998919818609:web:5d94c301f1fd83624fbad0",
    measurementId: "G-XM4S5BTYCB"
  };

// Initialize Firebase
const firebaseDB=firebase.initializeApp(firebaseConfig);
const db=firebase.firestore();
const auth=firebase.auth();

export {auth};
export default firebaseDB.database().ref();