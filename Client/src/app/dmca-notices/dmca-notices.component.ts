import { Component, OnInit } from '@angular/core';
import {PolicyDataBaseService} from '../policy-data-base.service';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { UserDataBaseService} from '../user-data-base.service';


import {firebase} from '@firebase/app';


@Component({
  selector: 'app-dmca-notices',
  templateUrl: './dmca-notices.component.html',
  styleUrls: ['./dmca-notices.component.css']
})
export class DmcaNoticesComponent implements OnInit {
policy;
  
  user;
  check;
   constructor(private privacyPolicyService: PolicyDataBaseService, private userDataBaseService: UserDataBaseService,private authService: AuthService) {}
   //function to encode the data
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
    
    var elementID = this.getID(event);//getting the ID of the item so it can be updated
    var descript2 = this.encodeHTML(descript);
    var data={
      descript:descript2
    }
    
    this.privacyPolicyService.updatePolicy(elementID,data).subscribe(data => {
          console.log(data);
        });
    
  }
  
  setCheck(){//setting the check to display the right doc
    this.check="dmcaDoc";
  }
  

  ngOnInit() {
    
    this.privacyPolicyService.getData(this.onResponsePolicy.bind(this));
    this.userDataBaseService.getData(this.onResponseUser.bind(this));
  
    
  }
}
