import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const base ='https://se3316-jdailly-lab5-jdailly.c9users.io:8081/api';

@Injectable({
  providedIn: 'root'
})
export class CommentsDataBaseService {

  constructor(private http: HttpClient) { }
  
  getData(callback_fun) {
    console.log('getData');
      this.http.get(base + '/comments').subscribe(data => {
          console.log("gettingdata");
          console.log("data");
          callback_fun(data);
          
      });
  }
}
