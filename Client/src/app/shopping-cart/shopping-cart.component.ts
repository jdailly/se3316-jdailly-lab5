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


  constructor(private cartDataBaseService: CartDataBaseService,
  private authService: AuthService,
  private prodcutsDataBaseService: ProductsDataBaseService) { }

 onResponseCart(res: string) {
    this.cart = res;
  }
  onResponseProducts(res: string) {
    this.products = res;
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
    }
      
    } 
    
   }
 }
 
 
 deleteCart(){
   for( var i = 0; i < this.cart.length; i++ ){
    if ((auth().currentUser.email)==this.cart[i].userid){
       var cartId= this.cart[i]._id;
      this.cartDataBaseService.deleteItem(cartId).subscribe(data=>{
        console.log(data); 
      });
    }
   }
 }
 
  ngOnInit() {
     this.cartDataBaseService.getData(this.onResponseCart.bind(this));
     this.prodcutsDataBaseService.getData(this.onResponseProducts.bind(this));
  }

}
