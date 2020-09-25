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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  /* query object / documentRef objects 
      documentRef returns a documentSnapshop object (CRUD)
      collectionRef returns a querySnapshop object 

  */
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  //const collectionRef = firestore.collection('users');
  
  const snapShot = await userRef.get();
  //const colletionSnapshot = await collectionRef.get();
  //console.log({ collection: colletionSnapshot.docs.map(doc => doc.data()) });

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  console.log(collectionRef)

  /* .batch return map */
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;