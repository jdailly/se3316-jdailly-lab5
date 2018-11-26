import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const base ='https://se3316-jdailly-lab5-jdailly.c9users.io:8081/api';


@Injectable({
  providedIn: 'root'
})
export class UserDataBaseService {

  constructor(private http: HttpClient) { }
  
  getData(callback_fun) {
    console.log('getData');
      this.http.get(base + '/user/').subscribe(data => {
          console.log("gettingdata");
          console.log("data");
          callback_fun(data);
          
      });
  }
  
  addUser(data){
    
     return this.http.post('/api/user/create', data);
   }
 
 
  
}
