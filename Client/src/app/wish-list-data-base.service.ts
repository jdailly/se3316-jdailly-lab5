import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const base ='https://se3316-jdailly-lab5-jdailly.c9users.io:8081/api';
@Injectable({
  providedIn: 'root'
})
export class WishListDataBaseService {

  constructor(private http: HttpClient) { }
  
   getData(callback_fun) {
    console.log('getData');
      this.http.get(base + '/wishList/').subscribe(data => {
          console.log("gettingdata");
          console.log("data");
          callback_fun(data);
          
      });
  }
  
  
  addWish(data){
    return this.http.post('api/wishList/create', data);
  }
  
  deleteItem(id: String){
    return this.http.delete('/api/wishList/'+id+'/delete');
  }
  
  updateWish(id: String,data){
    
    return this.http.put('/api/wishList/'+id+'/update', data);
    
  }
  
  
  updateItem(id: String,data){
    
    return this.http.put('/api/wishList/'+id+'/item', data);
    
  }
  
  updateQuan(id: String,data){
    return this.http.put('/api/wishList/'+id+'/quantity', data);
    
  }
  
  updateDes(id: String,data){
    return this.http.put('/api/wishList/'+id+'/des', data);
    
  }
}
