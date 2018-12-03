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
  
  getID(event)
  {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id.value;
    return idAttr;
    
  }
  
  policyChange(event,descript){
    
    var elementID = this.getID(event);
    console.log(elementID);
    
    var data={
      descript:descript
    }
    
    this.privacyPolicyService.updatePolicy(elementID,data).subscribe(data => {
          console.log(data);
        });
    
  }
  
  setCheck(){
    this.check="dmca";
  }
  

  ngOnInit() {
    
    this.privacyPolicyService.getData(this.onResponsePolicy.bind(this));
    this.userDataBaseService.getData(this.onResponseUser.bind(this));
  
    
  }
}