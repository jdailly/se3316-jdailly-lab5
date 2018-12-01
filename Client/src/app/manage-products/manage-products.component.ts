import { Component, OnInit } from '@angular/core';
import { ProductsDataBaseService} from '../products-data-base.service';
import { CommentsDataBaseService} from '../comments-data-base.service';


@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  product;

  constructor(private prodcutsDataBaseService: ProductsDataBaseService) { }
  
   onResponseProducts(res: string) {
    this.product = res;
  }
  
  
  updateName($event,name){
     var elementID = this.getID(event);
     
     var data={
         
         name: name,
     }
     
    this.prodcutsDataBaseService.updateData(elementID,data).subscribe(data => {
            console.log(data);
            });  
  }
  
  deleteItem(event){
      var elementID = this.getID(event);
      
     this.prodcutsDataBaseService.deleteItem(elementID).subscribe(data => {
            console.log(data);
            });  
     
  }
  
  AddItem(name,price,quantity,des){
      
      var data={
          name: name,
          price: price,
          tax: 13,
          quantity: quantity,
          des: des,
          purchased: 0,
          url: "/assets/imgs/download.png",
      }
      
      this.prodcutsDataBaseService.createProduct(data).subscribe(data => {
            console.log(data);
            }); 
      
  }
  
  
  updateQuan(event,quantity){
      
     var elementID = this.getID(event);
     
     var data={
         
         quantity: quantity,
     }
     
    this.prodcutsDataBaseService.updateData(elementID,data).subscribe(data => {
            console.log(data);
            });  
  }
  
  
  
  updatePrice(event,price){
      
     var elementID = this.getID(event);
     
     var data={
         price: price,
     }
    this.prodcutsDataBaseService.updateData(elementID,data).subscribe(data => {
            console.log(data);
            });   
      
  }
  
  
  getID(event){
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.class.value;
    return idAttr;
    
  }
  
  
  updateDes(event,des){
      
    var elementID = this.getID(event); 
      
     var data={
         des: des,
     }
      
    this.prodcutsDataBaseService.updateData(elementID,data).subscribe(data => {
            console.log(data);
            
            });  
      
  }


  ngOnInit() {
       this.prodcutsDataBaseService.getData(this.onResponseProducts.bind(this));
  }

}
