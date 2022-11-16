import { takeLatest, call, all, put } from 'redux-saga/effects' //takeLatest
import userTypes from './user.types'
import { signInSuccess, signOutUserSuccess, userError, resetPasswordSuccess } from './user.actions'
import { auth, handleUserProfile, GoogleProvider, getCurrentUser} from './../../firebase/utility'
import {handleResetPasswordAPI} from './user.helpers'
 //generator functions



export function* getSnapshotFromUserAuth(user, additionalData={}){ 
    // this is a helper function that will be used by other generator functions. 
    try{

    
        const userRef = yield call(handleUserProfile, { userAuth: user, additionalData })
        // in userRef, we call the function we are interested in, and then we pass it the args that it is expecting, check the handleUserProfile definition, you literally have to pass it user and addiionalData as args
        const snapshot = yield userRef.get()
        // store the user information data in the snapshot variable, get() returns this information
            yield put(
                //use the PUT in order to dispatch the success event becasue we are dispatching to the store, not to a local state
                signInSuccess({
                    id:snapshot.id,
                    ...snapshot.data()
                })
            )
      } catch (err) {
        //   console.log(err)
      }
    }

export function* emailSignIn( {payload: { email, password }} ){ 
    //this function receives the entire action, from that we can destructure the payload to email adn password, as that is what we will work with
    try{
        const { user } = yield auth.signInWithEmailAndPassword(email, password)//this line signs in the user, but DOES NOT ACTUALLY UPDATE THE STORE, therefore we need the next piece, for that we will use the helper generator function that is called below and described above
        // we will send it the user information to be used in the function
    
        yield getSnapshotFromUserAuth(user)

    } catch (err){

    }
}

export function* onEmailSignInStart() {  
    // takeLatest expects the action you are listening for, in this case EMAIL SIGN IN START and a GENERATOR FN that will handle the the event itself, so in this case it's right above as emailSignIn.
    // So there are two halves to this, one begin the interceptor function who's sole purpose is to listen for the event in question, and then call the second half of this in response.
    yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn)
}

export function* isUserAuthenticated() {
    // just the next domino, once the listened for check occurs, we will end up here via the check user sesstion
    try {
        const userAuth = yield getCurrentUser()
        //import from firebase utility file, will return either the userAuth if it exists
        if(! userAuth) return
        yield getSnapshotFromUserAuth(userAuth)
        // now if tjhey are signed in, we will restore the store with teh userAuth information by sending the userAuth to that getSnapshot function
    } catch (err){
        // console.log(err)
    }
}

export function* onCheckUserSession(){ ////Check user session will persist the user's auth status within the app

    yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated)
    // again, takelatest establishes the listener for the event you are interested in and then calls  a helper function if that is true after all
    
}

export function* signOutUser() {
    try {   
        yield auth.signOut() //
        yield put(signOutUserSuccess()) // success will update the store
    } catch (err){
        // console.log(err)
    }
}

export function* onSignOutUserStart(){
    yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser )
}

export function* signUpUser({ payload: {
    displayName,
    email,
    password,
    confirmPassword
}}){

    if (password !== confirmPassword){
            const err = ['Passwords do not match']
            yield put(
                userError(err)
            )
            return
        }
    try {
            const { user } = yield auth.createUserWithEmailAndPassword(email, password)
            const additionalData = {displayName}
            yield getSnapshotFromUserAuth(user, additionalData )
            // yield call(handleUserProfile, {userAuth: user, additionalData: { displayName } })
            
        } catch(err){

        }

}

export function* onSignUpUserStart(){
    yield takeLatest(userTypes.SIGN_UP_USER_START,signUpUser)
}


export function* resetPassword({ payload:{ email }}){

   
    try {
        yield call(handleResetPasswordAPI, email)
        yield put(
            resetPasswordSuccess()
        )
        }catch(err){
            yield put(
                userError(err)
            )
        }

}

export function* onResetPasswordStart(){
    yield takeLatest(userTypes.RESET_PASSWORD_START, resetPassword )
}

export function* googleSignIn(){
    try{
        const {user} = yield auth.signInWithPopup(GoogleProvider)
        yield getSnapshotFromUserAuth(user) // takes user and signs in, updates redux store
    }
    catch (err) {
        // console.log(err)
    }
}
export function* onGoogleSignInStart(){
    yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, googleSignIn)
}


export default function* userSagas(){
    yield all([call(onEmailSignInStart), // only need to pass start generator functions
    call(onCheckUserSession), //  pass in the onCheckUserSession, will then dispatch the action to check user session, which in turn will activate the saga and relevant functions for chekcing the auth status, and then return that auth information to the store
    call(onSignOutUserStart),
    call(onSignUpUserStart),
    call(onResetPasswordStart),
    call(onGoogleSignInStart) ])
}

