import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { PartnerservService } from '../../services/partnerserv.service';
import { Partners } from 'src/app/interfaces/partners';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { isArray } from 'util';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  mapkey:string = environment.mapKey;
  direccion = ''; // Propiedad definida con valor predeterminado vacío
  listP: Partners[] = [];

//Initial Map
  lat = -34.5833472;
  lng = -58.4187904;

  //form Services
  fService: FormGroup = this.fb.group({
    service        : ['', [Validators.required]],
  });

  fPartner: FormGroup = this.fb.group({
    partner        : ['', [Validators.required]],
  })


  constructor( private partnerServ : PartnerservService,
               private fb: FormBuilder) { }

  async ngOnInit() {

    this.partnerServ.getPartners().subscribe(partners=>{
      this.listP = partners;

      console.log(this.listP)

    })

    this.getLocation()
    
  }

  
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => this.showPosition(position));
      
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  showPosition(position:any) {
    this.lat  = position.coords.latitude;
    this.lng = position.coords.longitude;
  }

  lookService(){
    const service:string = this.fService.controls['service'].value;
    // this.listP = this.listP.filter(partner =>
    //   partner.service.toLowerCase().includes(service.toLowerCase())
    // );

    this.listP.forEach(partner => {
      if(Array.isArray((partner.service))){
        partner.service.forEach((s:string) => {
        if (s.toLowerCase().includes(service.toLowerCase())) {
          this.listP.push(partner);
        }
        else{
          this.listP = this.listP.filter(p => p.service.includes(s));
        }
      });
    }
  })


    console.log(service)

  }

  lookPartner(){
    const partner = this.fPartner.controls['partner'].value;
      
    console.log(partner)
  }

}
