import { Component, OnInit } from '@angular/core';
import { ProductsDataBaseService} from '../products-data-base.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  
  show_more: Boolean=false;
  productID: Number=0;

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
  
  
  
  showMore(){
    this.show_more=true;
  }
  
  closeMore(){
    this.show_more=false;
  }
  
  setProductID(id: Number){
    console.log(this.id);
  }
  

  

  ngOnInit() {
    
    
     this.prodcutsDataBaseService.getData(this.onResponse.bind(this));
     
  
  }


}
