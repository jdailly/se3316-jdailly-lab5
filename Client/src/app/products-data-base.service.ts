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
    
    return this.http.put('/api/product/'+id+'/update', data);
    
    
  }
  
  deleteItem(id: String){
    return this.http.delete('/api/product/'+id+"/delete");
  }
  
  
  createProduct(data){
    return this.http.post('/api/product/create',data);
  }
 
 
}
