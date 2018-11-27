import { Component, OnInit } from '@angular/core';
import { ProductsDataBaseService} from '../products-data-base.service';
import { Routes, RouterModule } from '@angular/router';


 //product;
 
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {


  product;
  
  constructor(private prodcutsDataBaseService: ProductsDataBaseService) { }
  
  onResponse(res: string) {
    this.product = res;
    this.sort();
  }
  
  

  
  sort(){
    console.log(this.product);
    var replace = this.product;
    console.log(replace.length);
    for (var i = (replace.length-1); i >=0; i--){
      for (var j = 1; j<=i; j++){
        if(replace[j-1].purchased<replace[j].purchased){
          var temp = replace[j-1];
          replace[j-1]=replace[j];
          replace[j]=temp;
        }
      }
    }
    
    console.log(replace);
    
  }

  
  // onClick(){
  //     this.prodcutsDataBaseService.getData(this.onResponse.bind(this));
  //     console.log(this.response1);
  //   }
    
    // sendUser(email: String, password: String){
      
    //   var data={
    //     password: String,
    //     email: email,
    //     manager: false
    //   }
      
    //   this.userDataBaseService.addUser(data).subscribe((response)=>{
    //   console.log(response);
    // });
    // }

  ngOnInit() {
    
    
     this.prodcutsDataBaseService.getData(this.onResponse.bind(this));
     
  
  }

}
