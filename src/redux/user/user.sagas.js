import { takeLatest, put, all, call } from 'redux-saga/effects';
import UserActionTYpes from './user.types';
import {auth, googleProvider, createUserProfileDocument  } from '../../firebase/firebase.utils';
import { googleSignInSuccess, googleSignInFailure, emailSignInSuccess, emailSignInFailure } from './user.actions';

export function* signInWithGoogle(){
    try {
        const user = yield auth.signInWithPopup(googleProvider);
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();
        yield put(googleSignInSuccess({ id: userSnapshot.id, ...userSnapshot.data()}))
        //console.log(user)
    } catch (e) {
        yield put(googleSignInFailure(e));
    }
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        const userRef = yield call(createUserProfileDocument, user);
        console.log(user);

        const userSnapshot = yield userRef.get();
        yield put(
            emailSignInSuccess({id: userSnapshot.id, ...userSnapshot.data() })
        )
    } catch (e) {
        yield put(emailSignInFailure(e))
    }
  }
  

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTYpes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTYpes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* userSagas(){
 yield all([
     call(onGoogleSignInStart), 
     call(onEmailSignInStart) 
    ])
}