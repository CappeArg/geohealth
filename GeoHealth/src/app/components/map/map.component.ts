import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { PartnerservService } from '../../services/partnerserv.service';
import { Partners } from 'src/app/interfaces/partners';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  mapkey:string = environment.mapKey;
  listP: Partners[] = [];

  title = 'My first AGM project';
  lat = -34.5833472;
  lng = -58.4187904;


  constructor( private partnerServ : PartnerservService) { }

  async ngOnInit() {

    this.partnerServ.getPartners().subscribe(partners=>{
      this.listP = partners;

    })

    this.getLocation()

    
  }

  
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => this.showPosition(position));
      
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  showPosition(position:any) {
    this.lat  = position.coords.latitude;
    this.lng = position.coords.longitude;
  }

}
