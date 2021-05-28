import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyC04aheV_N4L4rno3HLaRBxt3qdQHNIVKk",
  authDomain: "quizz-app-ngu.firebaseapp.com",
  projectId: "quizz-app-ngu",
  storageBucket: "quizz-app-ngu.appspot.com",
  messagingSenderId: "786706143626",
  appId: "1:786706143626:web:93f1e84605afb83d141073",
  measurementId: "G-H9HTHQCLVH",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.auth();

export default firebase;
