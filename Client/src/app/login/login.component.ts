import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ButtonPressed: boolean=false;
  
  
  email: string;
  password: string;
    
  
  constructor(public authService: AuthService) {}
    
    buttonClickTrue(){
      this.ButtonPressed =true;
      console.log("True");
    }
    
     buttonClickFalse(){
      this.ButtonPressed =false;
      console.log("False");
    }
    
    signup(email: String, password: String) {
       this.authService.signup(this.email, this.password);
       this.email = this.password = '';
     }
  
    login(email: String, password: String) {
      this.authService.login(this.email, this.password);
      this.email = this.password = '';    
    }
  
    logout() {
      this.authService.logout();
    }
    
    resend(){
      this.authService.sendEmailVerification();
      
    }
    
    nullCheck(email: String, password: String){
      
      if(email == null){
        alert("Please enter email");
      }
      
      else if(password==null){
        alert("Please enter password");
      }
      
    }



  ngOnInit() {
    
  }

}
