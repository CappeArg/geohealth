import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { PartnerservService } from '../../services/partnerserv.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HealthservService } from 'src/app/services/healthserv.service';
import { Services } from 'src/app/interfaces/services';
import { GmapsService } from '../../services/gmaps.service';
import { Partners } from 'src/app/interfaces/partners';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  mapkey:string = environment.mapKey;
  whereAmI:boolean = true;
  listP: Partners[] = [];
  listServices: Services[]=[]
  search:boolean=false
  state: string = "";
  collectionNameS:string = "services"; 
  collectionNameP:string = "partners"; 


  //ESTILO DE MAPA=>

  styleMap: google.maps.MapTypeStyle[]= require('./map-style.json');

//FIN DE ESTILO DE MAPA

//Initial Map
  lat = -34.5833472;
  lng = -58.4187904;

  //form Services
    fService: FormGroup = this.fb.group({
    service        : ['', [Validators.required]],
  });


  fUser: FormGroup = this.fb.group({
    street        : ['', [Validators.required]],
    number        : ['', [Validators.required]],
    city          : ['', [Validators.required]],
    state         : ['', [Validators.required]]



  })


  constructor( private healthServ : HealthservService,
               private partnerServ: PartnerservService,
               private gmaps      : GmapsService,
               private fb         : FormBuilder) { }

  ngOnInit() {

    Swal.showLoading()

    this.partnerServ.getAll(this.collectionNameP).subscribe(
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

    this.healthServ.getAll(this.collectionNameS).subscribe(
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
        // this.gmaps.getStateFromLatLng(this.lat,this.lng).subscribe(state=>{
        //   this.state = state;
        //   console.log(this.state)
        // })
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
    console.log(this.state)

    let service:string = this.fService.controls['service'].value;
 

    this.partnerServ.getItemByValueInArray(this.state,service,this.collectionNameP,'service','state').subscribe(data=>{
      if(service=="all"){
        this.partnerServ.getAll(this.collectionNameP).subscribe(
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

      this.partnerServ.getAll(this.collectionNameP).subscribe(
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
  geoUser(){
    Swal.showLoading()
    const query = this.dataFormGeo();
    this.getLatLng(query.street, query.number, query.city, query.state).subscribe((info: any) => {
   
    const lat = info.results[0].geometry.location.lat
    const lng = info.results[0].geometry.location.lng
    this.setLatLn(lat, lng);
    this.state = query.state.toUpperCase();
    this.whereAmI = false;
    Swal.close();
  }, error => {
    Swal.fire(
    'Error',
    `Sorry, we couldn't complete your request: ${error}`,
    'error'
  );
  });

  }

  dataFormGeo(){
    const street = this.fUser.controls['street'].value;
    const number = this.fUser.controls['number'].value;
    const city = this.fUser.controls['city'].value;
    const state = this.fUser.controls['state'].value;

  
  return {street, number, city, state}
    // this.getLatLng("Juan Manuel de Rosas", 957, "Rosario", "Santa Fe")
  }
 
  getLatLng(street: string, number: number, city: string, state: string){
    const address = `${street} ${number}, ${city}, ${state}, Argentina`;

    return this.gmaps.getCoordFromAddress(address)
  }

  setLatLn(lat:number, lng:number){
    this.lat = lat;
    this.lng = lng;
    
  }

  changeWhereAmI(){
    this.whereAmI = !this.whereAmI;
  }
  

}
