import { Component, OnInit } from '@angular/core';
import { UserDataBaseService} from '../user-data-base.service';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {firebase} from '@firebase/app';


@Component({
  selector: 'app-manage-accounts',
  templateUrl: './manage-accounts.component.html',
  styleUrls: ['./manage-accounts.component.css']
})
export class ManageAccountsComponent implements OnInit {

  user;
  
  constructor(private userDataBaseService: UserDataBaseService, private authService: AuthService) { }
  
   encodeHTML(s) {//encoding the passed values 
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}
  
  
  onResponseUser(res: string) {
    this.user = res;
  }
  
  storeManagerOff(event){
    var elementID = this.getID(event)// getting the ID
    var data ={
      manager: false
    }
    this.userDataBaseService.updateAccess(elementID,data).subscribe(data => {//sending the update to update
          console.log(data);
            });
  }
  
  disableAccount(event){
    var elementID = this.getID(event);
    console.log(elementID);
    var data={
      active: false
    }
    
    this.userDataBaseService.updateAccess(elementID,data).subscribe(data => {
      console.log(data);
    });
    
  }
  
  storeManagerOn(event){//changing the store manager to true
    var elementID = this.getID(event);
    var data={
      
      manager: true
    }
    
    this.userDataBaseService.updateAccess(elementID,data).subscribe(data => {
          console.log(data);
            });
    
  }
  
  activateaAccount(event){//activating an account
    var elementID = this.getID(event);
    console.log(elementID);
    
    var data={
      active: true
    }
    
    this.userDataBaseService.updateAccess(elementID,data).subscribe(data => {//updating the access of the active 
          console.log(data);
      });
            
            
    
  }
  
  getID(event)//the function to get the ID
  {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.class.value;
    return idAttr;
    
  }
  
  
  //updating all the data bases and assgin to the variable
  ngOnInit() {
    this.userDataBaseService.getData(this.onResponseUser.bind(this));
  }

}
