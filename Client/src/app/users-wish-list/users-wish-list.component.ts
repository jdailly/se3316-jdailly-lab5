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
  deleteBtn;
  
  constructor(private wishListService: WishListDataBaseService, private authService: AuthService,
  private userDataBaseService: UserDataBaseService) { }
  
  encodeHTML(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}
  
  onResponseWish(res: string) {
    this.wish = res;
  }
  onResponseUser(res: string) {
    this.user = res;
  }

  onClick(){
    console.log(this.wish[0].email);
  }
  
  editName(event,name: String){
    var idWish =this.getID(event);
    console.log(idWish);
    console.log(name);
    
    var data={
      name:name
    }
    
    this.wishListService.updateWish(idWish,data).subscribe(data => {
            console.log(data);
    });
  }

  
  editDes(event,des){
    var idWish = this.getID(event);
    console.log(des);
    var data={
      descrip:des
    }
    
    this.wishListService.updateWish(idWish,data).subscribe(data => {
            console.log(data);
            });
  }
  
  editAccess(event,access){
    var idWish = this.getID(event);
    var data={
      access:access
    }
    
    this.wishListService.updateWish(idWish,data).subscribe(data => {
            console.log(data);
            });
  }
  
clickMethod(name: string) {
  if(confirm("Are you sure to delete "+name)) {
    this.deleteColl();
  }
}
  
deleteColl(){
    
    this.wishListService.deleteItem(this.deleteBtn).subscribe(data => {
            console.log(data);
            });
  }
  
  setDeleteBtn(event){
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id.value;
    this.deleteBtn = idAttr;
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
