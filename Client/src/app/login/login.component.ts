import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { UserDataBaseService} from '../user-data-base.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ButtonPressed: boolean=false;
  response;
  user;
  
  email: string;
  password: string;
    
  
  constructor(private authService: AuthService, private userDataBaseService: UserDataBaseService) {}// public userDataBaseService: UserDataBaseService
  
   encodeHTML(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}
  
  onResponse(res: string) {
    this.response = res;
  }
  onResponseUser(res: string) {
    this.user = res;
    
  }
    
    buttonClickTrue(){
      this.ButtonPressed =true;
      console.log("True");
    }
    
     buttonClickFalse(){
      this.ButtonPressed =false;
      console.log("False");
    }
    
    signup(email: String, password: String) {
      
       var check=(this.authService.signup(this.email, this.password));
       console.log(check);
       
       if(check==true){
         
         this.sendUser(this.email);
         
       }
       this.email = this.password = '';
     }
  
    login(email: String, password: String) {
      
      for(var i =0; this.user.length; i++){
        if(email==this.user[i].email){
          if(this.user[i].active==false){
            alert('Your account has been deactivated, Please contact jdailly@uwo.ca');
            break;
          }
          else{
            this.authService.login(this.email, this.password);
              this.email = this.password = '';
              break;
          }
        }
      }
      // this.authService.login(this.email, this.password);
      // this.email = this.password = '';    
    }
  
    logout() {
      this.authService.logout();
    }
    
    resend(){
      this.authService.sendEmailVerification();
      
    }
    
    nullCheck(email: String, password: String){
      console.log();
      if(this.email == undefined){
        alert("Please enter email");
      }
      
      else if(this.password==undefined){
        alert("Please enter password");
      }
      
    }
    
    
    onClick(){
      this.userDataBaseService.getData(this.onResponse.bind(this));
      console.log(this.response);
    }
    
    sendUser(email: String){
     console.log(email);
      var data={
        email: email,
        manager:false,
        active: true,
        access: false
      }
      
      this.userDataBaseService.addUser(data).subscribe((response)=>{
      console.log(response);
    });
    }



  ngOnInit() {
     this.userDataBaseService.getData(this.onResponseUser.bind(this));
  }

}
