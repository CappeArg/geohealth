import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { PartnerservService } from '../../services/partnerserv.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HealthservService } from 'src/app/services/healthserv.service';
import { Services } from 'src/app/interfaces/services';
import { GmapsService } from '../../services/gmaps.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  mapkey:string = environment.mapKey;
  direccion = ''; // Propiedad definida con valor predeterminado vacío
  listP: any = [];
  listServices: Services[]=[]
  search:boolean=false
  state: any = "";

  //ESTILO DE MAPA=>

  styleMap: google.maps.MapTypeStyle[]=[
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#f5f5f5"
        }
      ]
    },
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off"
        }
      ]
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161"
        }
      ]
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#f5f5f5"
        }
      ]
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#bdbdbd"
        }
      ]
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#eeeeee"
        }
      ]
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575"
        }
      ]
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#e5e5e5"
        }
      ]
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e"
        }
      ]
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#ffffff"
        }
      ]
    },
    {
      featureType: "road.arterial",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575"
        }
      ]
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#dadada"
        }
      ]
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161"
        }
      ]
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e"
        }
      ]
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [
        {
          color: "#e5e5e5"
        }
      ]
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [
        {
          color: "#eeeeee"
        }
      ]
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#c9c9c9"
        }
      ]
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e"
        }
      ]
    }
  ];

//FIN DE ESTILO DE MAPA

//Initial Map
  lat = -34.5833472;
  lng = -58.4187904;

  //form Services
    fService: FormGroup = this.fb.group({
    service        : ['', [Validators.required]],
    // state          : ['', [Validators.required]]
  });

  // fPartner: FormGroup = this.fb.group({
  //   partner        : ['', [Validators.required]],
  // })


  constructor( private healthServ : HealthservService,
               private partnerServ: PartnerservService,
               private gmaps      : GmapsService,
               private fb         : FormBuilder) { }

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
            `Sorry, we couldn't complete your request: ${error}`,
            'error'
          );
      
      }
    );
    Swal.showLoading()

    this.healthServ.getServices().subscribe(
      services => {
        this.listServices = services;
        Swal.close();},
        error => {
          Swal.fire(
            'Error',
            `Sorry, we couldn't complete your request: ${error}`,
            'error'
            );
            }
            );
    this.getLocation()
    

  
  }



  
  getLocation() {
   
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        this.showPosition(position)
        this.gmaps.getStateFromLatLng(this.lat,this.lng).subscribe(state=>{
          this.state = state;
          console.log(this.state)
        })
      }, null,{enableHighAccuracy: true});
      
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

    this.search = true;

    let service:string = this.fService.controls['service'].value;
    console.log(service)

    this.partnerServ.getPartnerByService(this.state, service).subscribe(data=>{
      if(service=="all"){
        this.partnerServ.getPartners().subscribe(
          partners => {
            this.listP = partners;

          },
          error => {
            Swal.fire(
                'Error',
                `Sorry, we couldn't complete your request: ${error}`,
                'error'
              );
          
          }
        );
      }
      else{
        this.listP = data;
      }
    })
    
  }

  


  changeSearch(){
    if(this.search){
      this.search = false;
      Swal.showLoading()

      this.partnerServ.getPartners().subscribe(
        partners => {
          this.listP = partners;
          this.fService.controls['service'].setValue('All Services');
          Swal.close();
          
        },
        error => {
          Swal.fire(
              'Error',
              `Sorry, we couldn't complete your request: ${error}`,
              'error'
            );
        
        }
      );

    }
  }
  

}
