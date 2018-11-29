import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {CartDataBaseService} from '../cart-data-base.service';
import {firebase} from '@firebase/app';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart;


  constructor(private cartDataBaseService: CartDataBaseService,
  private authService: AuthService) { }

 onResponseCart(res: string) {
    this.cart = res;
  }
  
  // firebase.auth().onAuthStateChanged(function(user) {
  // if (user) {
  //   // User is signed in.
  // } else {
  //   // No user is signed in.
  // }
  //   });
    
  // user = firebase.auth().currentUser;

  // if (user) {
  //   // User is signed in.
  // } else {
  //   // No user is signed in.
  // }
  
  // pressed(){
  //   console.log(firebase.auth().currentUser.email);
  // }
 
  ngOnInit() {
     this.cartDataBaseService.getData(this.onResponseCart.bind(this));
  }

}
