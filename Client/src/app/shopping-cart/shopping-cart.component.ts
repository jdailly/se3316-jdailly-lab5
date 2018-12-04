import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {CartDataBaseService} from '../cart-data-base.service';
import {firebase} from '@firebase/app';
import { ProductsDataBaseService} from '../products-data-base.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart;
  products;
  total;
  showReceipt;


  constructor(private cartDataBaseService: CartDataBaseService,
  private authService: AuthService,
  private prodcutsDataBaseService: ProductsDataBaseService) { }

 encodeHTML(s) {//encoding the inputs
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}


 onResponseCart(res: string) {
    this.cart = res;
    
  }
  onResponseProducts(res: string) {
    this.products = res;
  }
  
  
  initialReceipt(){
    this.showReceipt=false;
  }
  
  setReceipt(){
    console.log(this.showReceipt)
    this.showReceipt=true;
    console.log(this.showReceipt)
  }
  
  addTotal(itemTotal){
    this.addTotal=this.addTotal+itemTotal;
  }
  
  initailTotal(){
    this.total=0;
    console.log("help me");
    for( var i=0; i< this.cart.length; i++){
      if ((auth().currentUser.email)==this.cart[i].userid){
        if(this.cart[i].bought==false){
          this.total=(this.cart[i].price*this.cart[i].quantity)+this.total;
        }
      }
    }
  }
  
  
  
  
  clickMethodClear() {
  if(confirm("Are you sure to clear Cart?")) {
    this.clearCart();
    }
  }

  clickMethoDelete() {
    if(confirm("Are you sure to Buy?")) {
      this.addPurchased();
      this.deleteCart();
      this.boughtCart();
      this.cartDataBaseService.getData(this.onResponseCart.bind(this));
      this.initailTotal();
      this.setReceipt();
      this.cartDataBaseService.getData(this.onResponseCart.bind(this));
    }
  }

  
  UpdateQuantity(event,changeAmount){
    var quantityCheck=false;
    
    for( var i = 0; i < this.cart.length; i++ ){
      
    if ((auth().currentUser.email)==this.cart[i].userid){
      //put the items from the cart back into the products database
      for(var j=0;j<this.products.length; j++){
        if(this.products[j].name == this.cart[i].item){
          if(this.products[j].quantity<(changeAmount+this.cart[i].quantity)){
            alert("Not enough items in the cart!");
            quantityCheck=true;
            break;
          }
          else{
            var addedQuan = this.products[j].quantity+this.cart[i].quantity-changeAmount;
            
            var data={
              
              quantity: addedQuan
              
            }
            
            var productid= this.products[j]._id;
            this.prodcutsDataBaseService.updateData(productid,data).subscribe(data => {
            console.log(data);
          });
          
        }
      }
      
    }
      
    } 
    
   }
   
   
   
  if(quantityCheck==false){
   var elementID = this.getID(event);
    
    var data2 ={
      quantity: changeAmount
    }
    
    this.cartDataBaseService.updateItem(elementID,data2).subscribe(data => {
          console.log(data);
    });
  }
   
    
    
    
  }
   
   getID(event)
  {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id.value;
    return idAttr;
  }
  
 clearCart(){
   for( var i = 0; i < this.cart.length; i++ ){
    if ((auth().currentUser.email)==this.cart[i].userid){
      //put the items from the cart back into the products database
      for(var j=0;j<this.products.length; j++){
        if(this.products[j].name == this.cart[i].item){
          var addedQuan = this.products[j].quantity+this.cart[i].quantity;
          var data={
            quantity: addedQuan
          }
          var productid= this.products[j]._id;
          this.prodcutsDataBaseService.updateData(productid,data).subscribe(data => {
          console.log(data);
        });
      }
      //delete all the items of that user in the cart
      var cartId= this.cart[i]._id;
      this.cartDataBaseService.deleteItem(cartId).subscribe(data=>{
        console.log(data); 
      });
      this.cartDataBaseService.getData(this.onResponseCart.bind(this));
    }
    } 
   }
   this.updateCart();
 }
 
 updateCart(){
     this.cartDataBaseService.getData(this.onResponseCart.bind(this));
     this.prodcutsDataBaseService.getData(this.onResponseProducts.bind(this));
 }
 
 deleteItem(event){
   var elementID=this.getID(event);
   
   this.cartDataBaseService.deleteItem(elementID).subscribe(data=>{
        console.log(data); 
      });
   
   this.cartDataBaseService.getData(this.onResponseCart.bind(this));
 }
 
 
 boughtCart(){//called when the user buys th
   this.cartDataBaseService.getData(this.onResponseCart.bind(this));//updating the cart variable
   for( var i = 0; i < this.cart.length; i++ ){
    if ((auth().currentUser.email)==this.cart[i].userid){
       var cartId= this.cart[i]._id;
       var data={//setting the bought variable to true
         bought: true
       }
       console.log("in the cart");
      this.cartDataBaseService.updateItem(cartId, data).subscribe(data=>{//updating the items
        console.log(data); 
      });
    }
   }
 }
 
 
 
 
 deleteCart(){
   console.log("help delete");
   for( var i = 0; i < this.cart.length; i++ ){
    if ((auth().currentUser.email)==this.cart[i].userid){
      if(this.cart[i].bought==true){
         var cartId= this.cart[i]._id;
        this.cartDataBaseService.deleteItem(cartId).subscribe(data=>{
          console.log(data); 
        });
      }
    }
   }
   
   this.updateCart();
  
 }
 
 
 addPurchased(){
      for( var i = 0; i < this.cart.length; i++ ){
      console.log("IN PURCHASED");
      //put the items from the cart back into the products database
          for(var j=0;j<this.products.length; j++){
            if(this.products[j].name == this.cart[i].item){
              if(this.cart[i].bought==false){
                var newPurchased= this.products[j].purchased + this.cart[i].quantity;
                
                var data ={
                  purchased: newPurchased
                }
                
                console.log("ADSASSA");
                console.log(newPurchased);
                var productid= this.products[j]._id;
            this.prodcutsDataBaseService.updateData(productid,data).subscribe(data => {
            console.log(data);
            
            });
              
              }
              
            }
          }
  
    }
}
 
 
  ngOnInit() {
    
     this.cartDataBaseService.getData(this.onResponseCart.bind(this));
     this.prodcutsDataBaseService.getData(this.onResponseProducts.bind(this));
     this.initialReceipt();
     
  }

}
