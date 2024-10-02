import { initializeApp } from 'firebase/app'; //initializarea app Firebase cu config
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'; //autentificare
import { 
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs
 } from 'firebase/firestore'; //baza de date

const firebaseConfig = {
  apiKey: "AIzaSyB2QymbLXDAIrGL8IN_D_fL1lNc6P6LA-o",
  authDomain: "crwn-clothing-db-july.firebaseapp.com",
  projectId: "crwn-clothing-db-july",
  storageBucket: "crwn-clothing-db-july.appspot.com",
  messagingSenderId: "357141604451",
  appId: "1:357141604451:web:e6501b73e844aada5ef056"
};//config pt conectarea aplicatiei la Firebase
const firebaseApp = initializeApp(firebaseConfig);
//setam Google authentication provider
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});


 //exportam metodele necesare pentru autentificare
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);//SIGN IN REQUEST
export const db = getFirestore();
//adaugarea datelor din shoo-data.js in DB
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey); //adauga in db colectia cu key respectiva
  const batch  = writeBatch(db);

  objectsToAdd.forEach((object)=>{
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
}
///-----
//get DB DATA
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  // console.log('docs:',querySnapshot.docs);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};


export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
  if(!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }
  return userDocRef;
};//stocarea datelor user-ului creat

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>{
  onAuthStateChanged(auth, callback);
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth, 
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
}
