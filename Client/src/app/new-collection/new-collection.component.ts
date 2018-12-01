import { Component, OnInit } from '@angular/core';
import {WishListDataBaseService} from '../wish-list-data-base.service';
import { auth } from 'firebase/app';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {firebase} from '@firebase/app';
import { Routes, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-collection',
  templateUrl: './new-collection.component.html',
  styleUrls: ['./new-collection.component.css']
})
export class NewCollectionComponent implements OnInit {
  
  wishList;
  
  constructor(private wishListService: WishListDataBaseService, private authService: AuthService) { }
  
  onResponseWish(res: string) {
    this.wishList = res;
    
  }
  
  Submit(name,access,description){
    console.log(description);
    console.log(access);
    var email= auth().currentUser.email;
    if(access == "true" || access == "false"){
      console.log("im in");
    }
    else{
      access = "false";
    }
    
    console.log(access);
    
    var userCollection = {
        
        item:"Test",
        quantity: 0,
        des:"Test"
        
      }
  
      var wishData ={
        
        name: name,
        email: email,
        access: access,
        descrip: description,
        userColl: userCollection
        
      }
      
      console.log(wishData);
      
      this.wishListService.addWish(wishData).subscribe(data =>{
        console.log(data);
      });
      
      
  }
  

  ngOnInit() {
    
    this.wishListService.getData(this.onResponseWish.bind(this));
    
  }

}
