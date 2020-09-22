import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDY7h1aEqsiJVouyzTRhA8KQPdeymC2v5E",
    authDomain: "crown-bf5bf.firebaseapp.com",
    databaseURL: "https://crown-bf5bf.firebaseio.com",
    projectId: "crown-bf5bf",
    storageBucket: "crown-bf5bf.appspot.com",
    messagingSenderId: "4633353727",
    appId: "1:4633353727:web:2f00f8450451c33d2b9bca"
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt :'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;




