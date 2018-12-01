import { Component, OnInit } from '@angular/core';
import { ProductsDataBaseService} from '../products-data-base.service';
import { Routes, RouterModule } from '@angular/router';
import { CommentsDataBaseService} from '../comments-data-base.service';
import {CartDataBaseService} from '../cart-data-base.service';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { UserDataBaseService} from '../user-data-base.service';
import {WishListDataBaseService} from '../wish-list-data-base.service';

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
  wishList;
  user;
  
  constructor(private prodcutsDataBaseService: ProductsDataBaseService, 
  private commentsDataBaseService: CommentsDataBaseService,
  private cartDataBaseService: CartDataBaseService,
  private authService: AuthService,
  private wishListService: WishListDataBaseService,
  private userDataBaseService: UserDataBaseService) { }
  
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
  
  onResponseWish(res: string) {
    this.wishList = res;
    
  }
  onResponseUser(res: string) {
    this.user = res;
    
  }
  
  
  checkBox(){
    console.log("checkBox");
}
  
  
  addWish(event, amount: Number){
    var wishID=this.getID(event);
    var wishDes;
    var wishName;
    var existUser=false;
    
    
    //Getting the item description
    for(var i = 0; i < this.product.length; i++){
      if(this.product[i]._id==wishID){
        console.log("im in");
        wishDes=this.product[i].des;
        wishName=this.product[i].name;
        break;
      }
    }
    
    
    
    if(existUser == false){
      
      var wishEmail=auth().currentUser.email;
      console.log(wishName);
      
      var userCollection = {
        
        item:"test",
        quantity:0,
        des:"test"
        
      }
      var wishData ={
        email: wishEmail,
        access: true,
        userColl: userCollection
        
      }
      
      console.log(wishData);
      
      this.wishListService.addWish(wishData).subscribe(data =>{
        console.log(data);
      })
      this.updateEverything();
    }
    
    //this.updateEverything();
    
    
  }
  
  
  updateDateWishList(event,amount,name,des){
    var elementID = this.getID(event);
    
    
    console.log(amount);
    console.log(name);
    console.log(des);

    var userCollection = {
      
        item:name,
        quantity: amount,
        des:des
        
      }
      
      var wishData ={
        
        userCollection: userCollection
        
      }
      
      console.log(wishData);
      
      
       this.wishListService.updateWishColl(elementID,wishData).subscribe(data => {
          console.log(data);
    });
    
    
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
      rating: selected,
      hidden: false
    }
    
    this.commentsDataBaseService.commentCreate(data).subscribe(data => {
          console.log(data);
    });
    
    this.updateEverything();
    
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
    
    //this.updateEverything();
    
  }
  
  
  hideComment(event){
    var elementID = this.getID(event);
    var data={
      hidden: true,
    }
    
    this.commentsDataBaseService.commentUpdate(elementID,data).subscribe(data => {
            console.log(data);
            
            });
    
  }
  
  unHideComment(event){
    var elementID = this.getID(event);
    var data={
      hidden: false,
    }
    
    this.commentsDataBaseService.commentUpdate(elementID,data).subscribe(data => {
            console.log(data);
            
            });
    
  }
  
  
  getID(event)
  {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.class.value;
    return idAttr;
    
  }
    
    //TODO: ADD A CHECK TO SHOPPING CART QUANTITY
  add(event, amount: Number){
    console.log(amount);
    var num = parseInt(amount,10);
    console.log(num);
    var cartCheck=false;
    var idAttr = this.getID(event);
    
    for(var i=0; i < this.product.length; i++){
      if(this.product[i]._id == idAttr){
        
        for(var j=0; j < this.cart.length; j++){
          
          if(this.cart[j].item ==this.product[i].name){
            
            cartCheck=true;
            
            var quanItem = (this.cart[j].quantity)+amount;
            
            var cartUpdateData={
              quantity: quanItem
            }
            
            var cartID=this.cart[j]._id;
            console.log(this.cart[j]._id);
            this.cartDataBaseService.updateItem(cartID,cartUpdateData).subscribe(data => {
            console.log(data);
            });
            this.updateEverything();
          }
        }
        

        var quan = (this.product[i].quantity)-num;
  
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
            quantity: amount
          }
          this.cartDataBaseService.createItem(cartData).subscribe(data=>{
          console.log(data);
          });
        }
        
        this.updateEverything();
        
      }
    }
    //this.updateEverything();
  }
  

  
  
  
  yesPrivate(event){
    var iduser=this.getID(event);
    console.log(iduser);
    
    var data={
      access:false
    }
    
    this.userDataBaseService.updateAccess(iduser,data).subscribe(data=>{
          console.log(data);
    });
    
    //this.updateEverything();
    
  }
  
  yesPublic(event){
    var iduser=this.getID(event);
    console.log(iduser);
    
    var data={
      access:true
    }
    
    this.userDataBaseService.updateAccess(iduser,data).subscribe(data=>{
          console.log(data);
    });
    
    //this.updateEverything();
    
  }
  
  
  updateEverything(){
    
    this.prodcutsDataBaseService.getData(this.onResponse.bind(this));
     this.commentsDataBaseService.getData(this.onResponseComments.bind(this));
     this.cartDataBaseService.getData(this.onResponseCart.bind(this));
     this.wishListService.getData(this.onResponseWish.bind(this));
     this.userDataBaseService.getData(this.onResponseUser.bind(this));
    
  }

  ngOnInit() {
    
    
     this.prodcutsDataBaseService.getData(this.onResponse.bind(this));
     this.commentsDataBaseService.getData(this.onResponseComments.bind(this));
     this.cartDataBaseService.getData(this.onResponseCart.bind(this));
     this.wishListService.getData(this.onResponseWish.bind(this));
     this.userDataBaseService.getData(this.onResponseUser.bind(this));
  
  }

}














//check if user already has a wish list
    // for (var i=0; i<this.wishList.length;i++){
    //   if(this.wishList[i].email == auth().currentUser.email){
    //     console.log("existUser");
    //     existUser=true;
    //     var wishListId=this.wishList[i]._id;
    //     var itemData={
    //       item: wishName
    //       // quantity: amount,
    //       // des: wishDes
    //     }
    //     var quanData={
    //       quantity: amount
    //     }
    //     var desData={
    //       des: wishDes
    //     }
        
        
    //     this.wishListService.updateItem(wishListId,itemData).subscribe(data => {
    //       console.log(data);
    //     });
        
    //     console.log("wait");
        
    //     this.wishListService.updateQuan(wishListId,quanData).subscribe(data => {
    //       console.log(data);
    //     });
    //     console.log("wait");
    //     this.wishListService.updateDes(wishListId,desData).subscribe(data => {
    //       console.log(data);
    //     });
    //     console.log("wait");
    //   }
    // }
    
    
    // //TODO: ADD A CHECK TO SHOPPING CART QUANTITY
  // minus(){
  //   console.log("minus");
  //   var cartCheck=false;
  //   var idAttr = this.getID(event);
    
  //   for(var i=0; i < this.product.length; i++){
  //     if(this.product[i]._id == idAttr){
        
  //       for(var j=0; j < this.cart.length; j++){
          
  //         if(this.cart[j].item ==this.product[i].name){
            
  //           cartCheck=true;
            
  //           var quanItem = (this.cart[j].quantity)-1;
            
  //           if(this.cart[j].quantity<=1){
  //             console.log('deleting Item');
  //             var deleteId= this.cart[j]._id;
  //             console.log(deleteId);
  //             this.cartDataBaseService.deleteItem(deleteId).subscribe(data =>{
  //               console.log(data);
  //             });
  //           }
            
  //           var cartUpdateData={
  //             quantity: quanItem
  //           }
            
  //           var cartID=this.cart[j]._id;
  //           console.log(this.cart[j]._id);
  //           this.cartDataBaseService.updateItem(cartID,cartUpdateData).subscribe(data => {
  //           console.log(data);
  //           });
  //         }
  //       }
        

  //       var quan =(this.product[i].quantity)+1;
  
  //       var data={
  //         quantity: quan
  //       }
        
  //       this.prodcutsDataBaseService.updateData(idAttr,data).subscribe(data => {
  //         console.log(data);
  //       });
        
  //       if (cartCheck==false){ 
  //         var cartData={
  //           userid: auth().currentUser.email,
  //           item: this.product[i].name,
  //           quantity: 1
  //         }
  //         this.cartDataBaseService.createItem(cartData).subscribe(data=>{
  //         console.log(data);
  //         });
  //       }
        
  //     }
  //   }
   
  // }