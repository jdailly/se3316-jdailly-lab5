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

submit(manEmail,userEmail,topic,where){
  var data={
    email:manEmail,
    who: userEmail,
    what: topic,
    where: where
  }
  
  this.dmcaDataBaseService.postDmca(data).subscribe(data=>{
          console.log(data);
    });
}


  ngOnInit() {
    this.dmcaDataBaseService.getData(this.onResponseDmca.bind(this));
  }

}
