import { Component, OnInit } from '@angular/core';
import {PolicyDataBaseService} from '../policy-data-base.service';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { UserDataBaseService} from '../user-data-base.service';


import {firebase} from '@firebase/app';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})

export class PrivacyPolicyComponent implements OnInit {
  
  policy;
  
  user;
  
  check;

  constructor(private privacyPolicyService: PolicyDataBaseService, private userDataBaseService: UserDataBaseService,private authService: AuthService) {}
  
  //encoding the imput
  encodeHTML(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  }
  
   onResponsePolicy(res: string) {
    this.policy = res;
    
  }
  
  onResponseUser(res: string) {
    this.user = res;
    this.setCheck();
  }
  
  getID(event)//=function to get the ID
  {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id.value;
    return idAttr;
    
  }
  
  policyChange(event,descript){
    var elementID = this.getID(event);
    var descript2 = this.encodeHTML(descript);
    var data={
      descript:descript2
    }
    
    this.privacyPolicyService.updatePolicy(elementID,data).subscribe(data => {
          console.log(data);
        });
  }
  
  
  setCheck(){
    this.check="privacy";
  }
  

  ngOnInit() {
    this.privacyPolicyService.getData(this.onResponsePolicy.bind(this));
    this.userDataBaseService.getData(this.onResponseUser.bind(this));
    
  }
}
