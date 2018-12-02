import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { UserDataBaseService} from '../user-data-base.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  user;
  
  constructor(private authService: AuthService, private userDataBaseService: UserDataBaseService) { }
  
 
 onResponseUser(res: string) {
    this.user = res;
  }

  ngOnInit() {
    this.userDataBaseService.getData(this.onResponseUser.bind(this));
  }

}
