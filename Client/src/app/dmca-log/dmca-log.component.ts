import { Component, OnInit } from '@angular/core';
import {DmcaDataBaseService} from '../dmca-data-base.service';
@Component({
  selector: 'app-dmca-log',
  templateUrl: './dmca-log.component.html',
  styleUrls: ['./dmca-log.component.css']
})
export class DmcaLogComponent implements OnInit {

  dmca;

  constructor(private dmcaDataBaseService: DmcaDataBaseService) { }

onResponseDmca(res: string) {
    this.dmca = res;
    
  }
  
  encodeHTML(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  }

submit(manEmail,userEmail,topic,where){
  //encoding all the inputs of the variables
  var manEmail2 = this.encodeHTML(manEmail);
  var userEmail2 = this.encodeHTML(userEmail);
  var topic2= this.encodeHTML(topic);
  var where2= this.encodeHTML(where);
  //setting the data for the post
  var data={
    email:manEmail2,
    who: userEmail2,
    what: topic2,
    where: where2
  }
  
  this.dmcaDataBaseService.postDmca(data).subscribe(data=>{//posting the data to the data Base
          console.log(data);
    });
}


  ngOnInit() {
    this.dmcaDataBaseService.getData(this.onResponseDmca.bind(this));
  }

}
