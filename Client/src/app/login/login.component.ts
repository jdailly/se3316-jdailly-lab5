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
    
  
  constructor(private authService: AuthService, private userDataBaseService: UserDataBaseService) {}
  
  //encoding the html
   encodeHTML(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}
  
  onResponse(res: string) {
    this.response = res;
  }
  onResponseUser(res: string) {
    this.user = res;
    
  }
    
    //booloean for what can be shown
    buttonClickTrue(){
      this.ButtonPressed =true;
      
    }
    //setting a booloean for what can be shown
     buttonClickFalse(){
      this.ButtonPressed =false;
      
    }
    
    signup(email: String, password: String) {
      
       var check=(this.authService.signup(this.email, this.password));
       console.log(check);
       
       if(check==true){
         
         this.sendUser(this.email);
         
       }
       this.email = this.password = '';//setting the eamil back
     }
  
    login(email: String, password: String) {
      console.log(email);
      var loginCheck=false;
      for(var i =0; i< this.user.length; i++){
        if(email==this.user[i].email){
          if(this.user[i].active==false){
            alert('Your account has been deactivated, Please contact jdailly@uwo.ca');
            loginCheck=true;
            break;
          }
          else{
            console.log("in the else");
            this.authService.login(this.email, this.password);
              this.email = this.password = '';
              loginCheck=true;
              break;
          }
        }
      }
      if(loginCheck==false){
        this.authService.login(this.email, this.password);
      }
      this.email = this.password = ''; //clearing the email and password   
    }
  
    logout() {
      this.authService.logout();//function for logging out
    }
    
    resend(){
      this.authService.sendEmailVerification();//resend email verification
      
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
    
    
    sendUser(email: String){
     var email2 = this.encodeHTML(email);
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



  ngOnInit() {//binding the user data to the variabel user
     this.userDataBaseService.getData(this.onResponseUser.bind(this));
  }

}
