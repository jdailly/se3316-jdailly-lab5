import { Component, OnInit } from '@angular/core';
import {WishListDataBaseService} from '../wish-list-data-base.service';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { UserDataBaseService} from '../user-data-base.service';


@Component({
  selector: 'app-users-wish-list',
  templateUrl: './users-wish-list.component.html',
  styleUrls: ['./users-wish-list.component.css']
})
export class UsersWishListComponent implements OnInit {

  
  wish;
  user;
  
  constructor(private wishListService: WishListDataBaseService, private authService: AuthService,
  private userDataBaseService: UserDataBaseService) { }
  
  onResponseWish(res: string) {
    this.wish = res;
  }
  onResponseUser(res: string) {
    this.user = res;
  }

  onClick(){
    console.log(this.wish[0].email);
  }
  
  ChangeName(event,name: String){
    var idWish =this.getID(event);
    console.log(idWish);
    
    var data={
      collName:name
    }
    
    this.userDataBaseService.updateAccess(idWish,data).subscribe(data => {
            console.log(data);
    });
  }
  
  Changequan(event,quan){
     var idWish = this.getID(event);
     
     var data={
      quantity:quan
    }
    
    this.wishListService.updateWish(idWish,data).subscribe(data => {
            console.log(data);
            });
  }
  
  ChangeDes(event,des){
    var idWish = this.getID(event);
    
    var data={
      collDes:des
    }
    
    this.userDataBaseService.updateAccess(idWish,data).subscribe(data => {
            console.log(data);
            });
  }
  
  Delete(event){
     var idWish = this.getID(event);
    
    this.wishListService.deleteItem(idWish).subscribe(data => {
            console.log(data);
            });
  }
  
  getID(event)
  {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.class.value;
    return idAttr;
    
  }
  
  


  ngOnInit() {
    
    this.wishListService.getData(this.onResponseWish.bind(this));
    this.userDataBaseService.getData(this.onResponseUser.bind(this));
  }

}
