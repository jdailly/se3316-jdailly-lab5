import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DmcaDataBaseService {

  constructor(private http: HttpClient) { }
  
  
  getData(callback_fun) {
    console.log('getData');
      this.http.get('/api/dmca').subscribe(data => {
          console.log("gettingdata");
          console.log(data);
          callback_fun(data);
          
      });
  }
  
  
  postDmca(data){
    return this.http.post('/api/dmca/create',data);
  }
}
