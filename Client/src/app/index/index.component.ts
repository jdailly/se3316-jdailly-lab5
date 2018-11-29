import { Component, OnInit } from '@angular/core';
import { ProductsDataBaseService} from '../products-data-base.service';
import { Routes, RouterModule } from '@angular/router';
import { CommentsDataBaseService} from '../comments-data-base.service';
import {CartDataBaseService} from '../cart-data-base.service';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { UserDataBaseService} from '../user-data-base.service';

import {firebase} from '@firebase/app';


 //product;
 
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {


  product;
  comment;
  cart;
  
  constructor(private prodcutsDataBaseService: ProductsDataBaseService, 
  private commentsDataBaseService: CommentsDataBaseService,
  private cartDataBaseService: CartDataBaseService,
  private authService: AuthService) { }
  
  onResponse(res: string) {
    this.product = res;
    this.sort();
  }
  
  onResponseComments(res: string) {
    this.comment = res;
  }
  
   onResponseCart(res: string) {
    this.cart = res;
  }
  
  
  submit(selected:Number, comment:String, event){
    console.log(comment);
    console.log(selected);
    console.log(event);
    var idProduct = this.getID(event);
    var userEmail= auth().currentUser.email
    console.log(idProduct);
    console.log(userEmail);
    var data ={
      productID: idProduct,
      user: userEmail,
      comment: comment,
      rating: selected
    }
    
    this.commentsDataBaseService.commentCreate(data).subscribe(data => {
          console.log(data);
    });
    
  }
  
  

  
  sort(){
    console.log(this.product);
    var replace = this.product;
    console.log(replace.length);
    for (var i = (replace.length-1); i >=0; i--){
      for (var j = 1; j<=i; j++){
        if(replace[j-1].purchased<replace[j].purchased){
          var temp = replace[j-1];
          replace[j-1]=replace[j];
          replace[j]=temp;
        }
      }
    }
    
    console.log(replace);
    
  }
  
  getID(event)
  {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.class.value;
    return idAttr;
    
  }
    
    //TODO: ADD A CHECK TO SHOPPING CART QUANTITY
  add(event){
    var cartCheck=false;
    var idAttr = this.getID(event);
    
    for(var i=0; i < this.product.length; i++){
      if(this.product[i]._id == idAttr){
        
        for(var j=0; j < this.cart.length; j++){
          
          if(this.cart[j].item ==this.product[i].name){
            
            cartCheck=true;
            
            var quanItem = (this.cart[j].quantity)+1;
            
            var cartUpdateData={
              quantity: quanItem
            }
            
            var cartID=this.cart[j]._id;
            console.log(this.cart[j]._id);
            this.cartDataBaseService.updateItem(cartID,cartUpdateData).subscribe(data => {
            console.log(data);
            });
          }
        }
        

        var quan =(this.product[i].quantity)-1;
  
        var data={
          quantity: quan
        }
        
        this.prodcutsDataBaseService.updateData(idAttr,data).subscribe(data => {
          console.log(data);
        });
        
        if (cartCheck==false){ 
          var cartData={
            userid: auth().currentUser.email,
            item: this.product[i].name,
            quantity: 1
          }
          this.cartDataBaseService.createItem(cartData).subscribe(data=>{
          console.log(data);
          });
        }
        
      }
    }
    
  }
  
  //TODO: ADD A CHECK TO SHOPPING CART QUANTITY
  minus(){
    console.log("minus");
    var cartCheck=false;
    var idAttr = this.getID(event);
    
    for(var i=0; i < this.product.length; i++){
      if(this.product[i]._id == idAttr){
        
        for(var j=0; j < this.cart.length; j++){
          
          if(this.cart[j].item ==this.product[i].name){
            
            cartCheck=true;
            
            var quanItem = (this.cart[j].quantity)-1;
            
            if(this.cart[j].quantity<=1){
              console.log('deleting Item');
              var deleteId= this.cart[j]._id;
              console.log(deleteId);
              this.cartDataBaseService.deleteItem(deleteId).subscribe(data =>{
                console.log(data);
              });
            }
            
            var cartUpdateData={
              quantity: quanItem
            }
            
            var cartID=this.cart[j]._id;
            console.log(this.cart[j]._id);
            this.cartDataBaseService.updateItem(cartID,cartUpdateData).subscribe(data => {
            console.log(data);
            });
          }
        }
        

        var quan =(this.product[i].quantity)+1;
  
        var data={
          quantity: quan
        }
        
        this.prodcutsDataBaseService.updateData(idAttr,data).subscribe(data => {
          console.log(data);
        });
        
        if (cartCheck==false){ 
          var cartData={
            userid: auth().currentUser.email,
            item: this.product[i].name,
            quantity: 1
          }
          this.cartDataBaseService.createItem(cartData).subscribe(data=>{
          console.log(data);
          });
        }
        
      }
    }
   
  }
  

  ngOnInit() {
    
    
     this.prodcutsDataBaseService.getData(this.onResponse.bind(this));
     this.commentsDataBaseService.getData(this.onResponseComments.bind(this));
     this.cartDataBaseService.getData(this.onResponseCart.bind(this));
  
  }

}
