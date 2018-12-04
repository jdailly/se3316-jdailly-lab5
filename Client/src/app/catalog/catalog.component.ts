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

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  
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
  
  //Encoding the inputs so it cant be attacked 
   encodeHTML(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}
  
  //loads the prodcuts and assings it to product
  onResponse(res: string) {
    this.product = res;
    this.sort(); // calls the sorting method to sort  by most products bought
  }
  
  //gets the info from comment data base and assigns it to comments
  onResponseComments(res: string) {
    this.comment = res;
    
  }
    // gets cart from the data base and assigns it to cars
   onResponseCart(res: string) {
    this.cart = res;
  }
  
  //gets wishList from the data base and assigns it to the wishlist 
  onResponseWish(res: string) {
    this.wishList = res;
  }
  
  
  //gets the user from the data base and assigns it to the user
  onResponseUser(res: string) {
    this.user = res;
  }
  
  // checks in the comments or the rating is null before the comment is saved to the data base
  checkNull(selected,input,event){
    if(input == undefined){
        alert("Please enter a comment");
      }
    else if(selected==undefined){
      alert("Please enter a rating");
    }
    else{
      this.clickMethod(selected,input,event);
    }
  }
  
  
  //this is the pop up that will show confirming that the user want to save the comment
  clickMethod(selected,input,event) {
  if(confirm("Are you sure you want to save this comment?")) {
    this.submit(selected,input,event);
    location.reload();
  }
}
  
  //this function will update the collection with the item they want to add
  updateDateWishList(event,amount,name,des){
    var elementID = this.getID(event);
    var userCollection = {//setting the all the values for the update
        item:name,
        quantity: amount,
        des:des
      }
      var wishData ={//setting user collection to the model made above for the data base
        userCollection: userCollection
      }
       this.wishListService.updateWishColl(elementID,wishData).subscribe(data => {
          console.log(data);
    });
  }
  
  //This is called after the user confirms they want to save the comment
  submit(selected:Number, comment:String, event){
    this.commentsDataBaseService.getData(this.onResponseComments.bind(this));
    var idProduct = this.getID(event);//getting the id of the product the comment is for
    var userEmail= auth().currentUser.email;//getting the email of the current user
    var comment2 = this.encodeHTML(comment);//encoding the comment
    var data ={//assigns all the values for the comment
      productID: idProduct,
      user: userEmail,
      comment: comment2,
      rating: selected,
      hidden: false
    }
    this.commentsDataBaseService.commentCreate(data).subscribe(data => {
          console.log(data);
    });
    this.updateEverything();// getting all the need new values from the data base
  }
  
  

  
  
  //this function sorts that data based on the most popular bought item
  sort(){
    var replace = this.product;
    for (var i = (replace.length-1); i >=0; i--){
      for (var j = 1; j<=i; j++){
        if(replace[j-1].purchased<replace[j].purchased){
          var temp = replace[j-1];
          replace[j-1]=replace[j];
          replace[j]=temp;
        }
      }
    }
  }
  
  
  //Will hide a comment if the manager chooses to hide it
  hideComment(event){
    var elementID = this.getID(event);
    var data={
      hidden: true,
    }
    this.commentsDataBaseService.commentUpdate(elementID,data).subscribe(data => {
      console.log(data);
    });
  }
  
  
  
  //will unhide a comment is the manager chooses
  unHideComment(event){
    var elementID = this.getID(event);
    var data={
      hidden: false,
    }
    this.commentsDataBaseService.commentUpdate(elementID,data).subscribe(data => {
      console.log(data);
    });
  }
  
  
  getID(event)// will return the id of a object 
  {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.class.value;
    return idAttr;
  }
    
  //adding item to the cart
  add(event, amount: Number, quantity: Number, price: Number){
    var num = parseInt(amount,10);
    var cartCheck=false;//boolean for checking if the item is already in the cart or not
    var idAttr = this.getID(event);//getting the ID of the product
    if(quantity>=amount){//check if there is enough of the product in stock
      for(var i=0; i < this.product.length; i++){//looping through all the products
        if(this.product[i]._id == idAttr){
          for(var j=0; j < this.cart.length; j++){
            if((this.cart[j].item ==this.product[i].name)&&(this.cart[i].bought==false)){//if the item is already in the cart it will update the quantity
              cartCheck=true;//setting the boolean check tp true 
              var quanItem = (this.cart[j].quantity)+amount;
              var cartUpdateData={
                quantity: quanItem
              }
              var cartID=this.cart[j]._id;
              this.cartDataBaseService.updateItem(cartID,cartUpdateData).subscribe(data => {
              console.log(data);
              });
              this.updateEverything();//updataing all the data from the data base
            }
          }
          var quan = (this.product[i].quantity)-num;
          var data={
            quantity: quan
          }
          this.prodcutsDataBaseService.updateData(idAttr,data).subscribe(data => {
            console.log(data);
          });
          
          if (cartCheck==false){ //if the item is not in the cart it will create a new item
            var cartData={
              userid: auth().currentUser.email,
              item: this.product[i].name,
              quantity: amount,
              price: price,
              bought: false
            }
            this.cartDataBaseService.createItem(cartData).subscribe(data=>{
            console.log(data);
            });
          }
          this.updateEverything();//Updating all the values 
        }
      }
    }
    else{
      alert('Not enough of that item in stock!')
    }
  }
  
  
  //getting all the data  and assigns to the repective variables
  updateEverything(){
    this.prodcutsDataBaseService.getData(this.onResponse.bind(this));
     this.commentsDataBaseService.getData(this.onResponseComments.bind(this));
     this.cartDataBaseService.getData(this.onResponseCart.bind(this));
     this.wishListService.getData(this.onResponseWish.bind(this));
     this.userDataBaseService.getData(this.onResponseUser.bind(this));
    
  }
  
  
  // getting all the data  and assigns to the repective variables when the page is loaded
  ngOnInit() {
     this.prodcutsDataBaseService.getData(this.onResponse.bind(this));
     this.commentsDataBaseService.getData(this.onResponseComments.bind(this));
     this.cartDataBaseService.getData(this.onResponseCart.bind(this));
     this.wishListService.getData(this.onResponseWish.bind(this));
     this.userDataBaseService.getData(this.onResponseUser.bind(this));
  }


}
