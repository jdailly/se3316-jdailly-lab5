import { Component, OnInit } from '@angular/core';
import {WishListDataBaseService} from '../wish-list-data-base.service';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {UserDataBaseService} from '../user-data-base.service';
@Component({
  selector: 'app-all-wish-list',
  templateUrl: './all-wish-list.component.html',
  styleUrls: ['./all-wish-list.component.css']
})
export class AllWishListComponent implements OnInit {

  wish;
  user;
  
  constructor(private wishListService: WishListDataBaseService, private authService: AuthService,
  private userDataBaseService: UserDataBaseService) { }
  
  
  //loading the wishList from the data base and assinging to the wish
  onResponseWish(res: string) {
    this.wish = res;
  }
  
  //loading the wishList from the data base and assinging to the wish
  onResponseUser(res: string) {
    this.user = res;
  }
  
 
  //called at the beggenning of the program and gets the data from the data bases
  ngOnInit() {
    this.wishListService.getData(this.onResponseWish.bind(this));
    this.userDataBaseService.getData(this.onResponseUser.bind(this));
  }
}


