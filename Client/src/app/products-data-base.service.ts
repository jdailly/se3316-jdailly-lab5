import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const base ='https://se3316-jdailly-lab5-jdailly.c9users.io:8081/api';

@Injectable({
  providedIn: 'root'
})


export class ProductsDataBaseService {

  constructor(private http: HttpClient) { }
  
  getData(callback_fun) {
    console.log('getData');
      this.http.get(base + '/product').subscribe(data => {
          console.log("gettingdata");
          console.log("data");
          callback_fun(data);
          
      });
  }
  
  updateData(id: String,data){
    console.log('In the update');
    console.log('/api/product/'+id+'/update')
    console.log(data);
    return this.http.put('/api/product/'+id+'/update', data);
    console.log("why dosnt this work?");
    
  }
 
 
}
