import { Component, OnInit } from '@angular/core';
import {PolicyDataBaseService} from '../policy-data-base.service';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { UserDataBaseService} from '../user-data-base.service';


import {firebase} from '@firebase/app';


@Component({
  selector: 'app-dmca',
  templateUrl: './dmca.component.html',
  styleUrls: ['./dmca.component.css']
})
export class DMCAComponent implements OnInit {

  policy;
  user;
  check;

  constructor(private privacyPolicyService: PolicyDataBaseService, private userDataBaseService: UserDataBaseService,private authService: AuthService) {}
  
   encodeHTML(s) {//this function will encode inputs
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  }
  
  //assgins the data policy to policy 
   onResponsePolicy(res: string) {
    this.policy = res;
  }
  
  //assigns the user data to user 
  onResponseUser(res: string) {
    this.user = res;
    this.setCheck();
  }
  
  //getting the ID of the data base
  getID(event)
  {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id.value;
    return idAttr;
  }
  
  
  policyChange(event,descript){//this fucntion wil change the policy for a manager
    var elementID = this.getID(event);
    console.log(elementID);
    var descript2 = this.encodeHTML(descript);// encoding the policy change
    var data={
      descript:descript2
    }
    
    this.privacyPolicyService.updatePolicy(elementID,data).subscribe(data => {
          console.log(data);
        });
    
  }
  
  setCheck(){
    this.check="dmca";
  }
  
  //loads all the data and will assigns it to the fucntions
  ngOnInit() {
    this.privacyPolicyService.getData(this.onResponsePolicy.bind(this));
    this.userDataBaseService.getData(this.onResponseUser.bind(this));
  }
}