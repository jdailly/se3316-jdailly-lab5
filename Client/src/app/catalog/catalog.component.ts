import { Component, OnInit } from '@angular/core';
import { ProductsDataBaseService} from '../products-data-base.service';
import { CommentsDataBaseService} from '../comments-data-base.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  
  show_more: Boolean=false;
  productID: Number=0;
  //TODO: set up comments update for array, get comment by ID 
  product;
  comments;
  
  constructor(private prodcutsDataBaseService: ProductsDataBaseService, private commentsDataBaseService: CommentsDataBaseService) { }
  
  onResponseProducts(res: string) {
    this.product = res;
    this.sort();
  }
  
  onResponseComments(res: string){
    this.comments=res;
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
  
  setProductID(id: String){
    console.log(id);
  }
  

  

  ngOnInit() {
    
    
     this.prodcutsDataBaseService.getData(this.onResponseProducts.bind(this));
     this.commentsDataBaseService.getData(this.onResponseComments.bind(this));
  
  }


}
