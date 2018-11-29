import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
  
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;
  AAError: boolean=false;
  DError: boolean=false;
  NACError: boolean=false;
  
  constructor(private firebaseAuth: AngularFireAuth) { 
    this.user = firebaseAuth.authState;
  }
  
  
  sendEmailVerification(){
    firebase.auth().currentUser.sendEmailVerification().then(function(){
      console.log("Check your email");
    }).catch(function(error){
      
    });
  }
  
  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
        firebase.auth().currentUser.sendEmailVerification().then(function(){
       alert("check your email");
        this.NACError = false;
        }).catch(function(error){
          
        });
      })
      .catch(err => {
        this.AAError=false;
        this.DError=false;
        this.NACError=true;
        alert("Something went wrong: " + err.message);
      });    
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
      })
      .catch(err => {
        alert("Something went wrong: "+ err.message);
      });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
  }

}