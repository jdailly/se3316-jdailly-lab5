import { Component, OnInit } from '@angular/core';
import { ProductsDataBaseService} from '../products-data-base.service';
import { Routes, RouterModule } from '@angular/router';
import { CommentsDataBaseService} from '../comments-data-base.service';


 //product;
 
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {


  product;
  comment;
  
  constructor(private prodcutsDataBaseService: ProductsDataBaseService, 
  private commentsDataBaseService: CommentsDataBaseService) { }
  
  onResponse(res: string) {
    this.product = res;
    this.sort();
  }
  
  onResponseComments(res: string) {
    this.comment = res;
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
  
  average(){
    console.log('YAY');
    }
    
    
    
  add(){
    console.log("add");
  }
  
  minus(){
    console.log("minus");
  }
  
//   idAttr: String;
  
// getID(event){
//   console.log("help");
//   console.log(event);
//   var target = event.target || event.srcElement || event.currentTarget ;
//   this.idAttr = target.attributes.id;
//   console.log(this.idAttr);
// }




  
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
     this.commentsDataBaseService.getData(this.onResponseComments.bind(this));
  
  }

}
