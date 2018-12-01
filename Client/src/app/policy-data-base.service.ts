import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PolicyDataBaseService {

  constructor(private http: HttpClient) { }
  
  
   getData(callback_fun) {
    console.log('getData');
      this.http.get('/api/policy').subscribe(data => {
          console.log("gettingdata");
          console.log(data);
          callback_fun(data);
          
      });
  }
  
  
  updatePolicy(id,data){
    return this.http.put('/api/policy/'+id+'/update',data);
  }
  
}
