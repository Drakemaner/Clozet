import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireBaseService {
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {}


  // Sign in with Google
  googleSignin(): Observable<firebase.auth.UserCredential> {
    return from(this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()));
  }

  // Sign out
  signOut(): Promise<void> {
    return this.afAuth.signOut();
  }

  // Get current user
  getCurrentUser(): Observable<firebase.User | null> {
    return this.afAuth.authState;
  }

  // Add a document to the 'users' collection
  async addUser(user: any): Promise<void> {
    return this.afs.collection('users').add(user).then(() => {});
  }

  // Get a user document from the 'users' collection
  getUser(userId: string): Observable<any> {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${userId}`);
    return userRef.valueChanges();
  }

  // Update a user document in the 'users' collection
  updateUser(userId: string, user: any): Promise<void> {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${userId}`);
    return userRef.update(user);
  }

  // Delete a user document from the 'users' collection
  deleteUser(userId: string): Promise<void> {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${userId}`);
    return userRef.delete();
  }
}