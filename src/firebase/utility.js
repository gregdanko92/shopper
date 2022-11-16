
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

// onclick - sign in with google
export const GoogleProvider =  new firebase.auth.GoogleAuthProvider()
GoogleProvider.setCustomParameters({prompt:'select_account'})
// export const signInWithGoogle = () => auth.signInWithPopup(GoogleProvider)

export const handleUserProfile = async ({userAuth, additionalData}) => {
    //helper function to check if the user that has signed in is stored in the users collections of the firebase database
    // if they do not exist in the db then 
    if(!userAuth) return;
    
    const { uid } = userAuth //userAuth is returned from firebase to the app whenever someone signs in

    const userRef = firestore.doc(`users/${uid}`)
    const snapshot = await userRef.get()

    if (!snapshot.exists){
        const { displayName, email } = userAuth
        const timestamp = new Date()
        const userRoles = ['user'] // default assignment will be user
        try { //add user and data to firebase db
            await userRef.set({
                displayName,
                email,
                createdDate: timestamp,
                userRoles, //pass this to firebase, now that it's passed you can log into firebase and add admin to the user roles array
                ...additionalData
            })
        } catch(err){
            //console.log(err)
        }
    }
    return userRef
}

export const getCurrentUser = () => {
//this fn will return a new promise, 
    return new Promise((resolve, reject)=>{
        
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe()
            resolve(userAuth) //resolution, if this resolves to truem then it will return that from the promise as resolved, 
        }, reject) //if not it gets rejected  and the fn will not proceed
    })
}