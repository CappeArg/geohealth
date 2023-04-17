import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { PartnerservService } from '../../services/partnerserv.service';
import { Partners } from 'src/app/interfaces/partners';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  mapkey:string = environment.mapKey;
  direccion = ''; // Propiedad definida con valor predeterminado vacío
  listP: Partners[] = [];
  filter: Partners[] = [];


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

  ngOnInit() {

    Swal.showLoading()

    this.partnerServ.getPartners().subscribe(
      partners => {
        this.listP = partners;
        Swal.close();
      },
      error => {
        Swal.fire(
            'Error',
            "Sorry, we couldn't complete your request",
            'error'
          );
      
      }
    );
    this.getLocation()
    
  }

  
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => this.showPosition(position));
      
    } else {
      Swal.fire(
        'Error',
        "Sorry, Geolocation is not supported by this browser",
        'error'
      );
    }
  }

  showPosition(position:any) {
    this.lat  = position.coords.latitude;
    this.lng = position.coords.longitude;
  }

  lookService(){
    const service:string = this.fService.controls['service'].value;
    
      this.filter = this.listP.filter(partner => partner.service.some((s:string) => s.toLowerCase().includes(service.toLowerCase())));
  }

  

  lookPartner(){
    const partner = this.fPartner.controls['partner'].value;
      
    console.log(partner)
  }

}
