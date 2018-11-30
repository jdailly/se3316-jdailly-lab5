import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { UserDataBaseService} from '../user-data-base.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  user;
  
  constructor(private authService: AuthService, private userDataBaseService: UserDataBaseService) { }
  
 
 onResponseUser(res: string) {
    this.user = res;
  }

  ngOnInit() {
    this.userDataBaseService.getData(this.onResponseUser.bind(this));
  }

}
