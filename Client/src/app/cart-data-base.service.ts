import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const base ='https://se3316-jdailly-lab5-jdailly.c9users.io:8081/api';

@Injectable({
  providedIn: 'root'
})
export class CartDataBaseService {

 constructor(private http: HttpClient) { }
 
  getData(callback_fun) {
    console.log('getit');
      this.http.get(base + '/cart').subscribe(data => {
          console.log("gettingdata2");
          console.log(data);
          callback_fun(data);
          
      });
  }
  
  createItem(data){
    console.log("creating Item");
    return this.http.post('/api/cart/create', data);
    
  }
  
  updateItem(id,data){
    console.log(id+"HELP");
    console.log('/api/cart/'+id+'/update');
    return this.http.put('/api/cart/'+id+'/update',data);
  }
  
  deleteItem(id){
    console.log("Deleted Item");
    return this.http.delete('/api/cart/'+id+'/delete');
  }
}
