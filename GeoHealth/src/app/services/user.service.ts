import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithPopup, signOut, GoogleAuthProvider, signInWithEmailAndPassword, User, authState} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User | null  = this.auth.currentUser
  getAuth:any;


  constructor(private auth:Auth) { }

  register({email, password}: any){
    return createUserWithEmailAndPassword(this.auth,email,password)
  }

  login({email, password}:any){
    return signInWithEmailAndPassword(this.auth,email,password)
  }

  logout(){
    return signOut(this.auth)
  }

  loginWithGoogle(){
    return signInWithPopup(this.auth, new GoogleAuthProvider())
  }

  getChangeUser(){
    return authState(this.auth)   
   }
}