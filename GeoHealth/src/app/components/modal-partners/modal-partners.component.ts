import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GmapsService } from 'src/app/services/gmaps.service';
import { PartnerservService } from 'src/app/services/partnerserv.service';
import Swal from 'sweetalert2';
import { Services } from '../../interfaces/services';
import { HealthservService } from '../../services/healthserv.service';
import { Observable, async } from 'rxjs';
import { GeoPoint } from '@angular/fire/firestore';

@Component({
  selector: 'app-modal-partners',
  templateUrl: './modal-partners.component.html',
  styleUrls: ['./modal-partners.component.css']
})
export class ModalPartnersComponent implements OnInit {
  partnerEdit:any;
  listServices: Services[] = [];
  address: string = "";
  
  form: FormGroup = this.fb.group({
    name        : ['', [Validators.required]],
    service     : ['',[Validators.required]],
    street      : ['',[Validators.required]],
    number      : ['',[Validators.required]],
    city        : ['',[Validators.required]],
    state       : ['',[Validators.required]],
    geo         : this.fb.group({
      latitude  : ['',[Validators.required]],
      longitude : ['',[Validators.required]],

    }),
    email       : ['',[Validators.email, Validators.required]],
    phone       : ['',[Validators.required]],
    active      : ['true',[]]
  })

  add:boolean = false;

  constructor(private partnerServ: PartnerservService,
              private healthservservice: HealthservService,
              private mapservice: GmapsService,
              private router:Router,
              private route:ActivatedRoute,
              private fb: FormBuilder
              ) {  }
               

ngOnInit() { 
    const partnerId = this.route.snapshot.paramMap.get('id');    
    if(partnerId === null){
      this.add= true

      //Testing Consulta Google maps
// this.getLatLng("Juan Manuel de Rosas", 957, "Rosario", "Santa Fe")
      
   }
   else{
      this.add = false
      this.partnerServ.getPartner(partnerId).subscribe(data=>{
        this.partnerEdit = data
        this.form = this.fb.group({


          name        : [this.partnerEdit.name],
          service     : [this.partnerEdit.service],
          street      : [this.partnerEdit.street],
          number      : [this.partnerEdit.number],
          city        : [this.partnerEdit.city],
          state       : [this.partnerEdit.state],
          geo         : this.fb.group({
            latitude: [this.partnerEdit.geo.lat],
            longitude: [this.partnerEdit.geo.lng]
          }),
          email       : [this.partnerEdit.email],
          phone       : [this.partnerEdit.phone],
          active      : [this.partnerEdit.active]

        })
      },
      error => {
        Swal.fire(
          'Error',
          "Sorry, we couldn't complete your request",
          'error'
        );
      })

  }

  this.healthservservice.getServices().subscribe((services)=>{

    this.listServices = services;

  },
  error => {
    Swal.fire(
      'Error',
      "Sorry, we couldn't complete your request",
      'error'
    );
  })
}

dataFormGeo(){
  console.log("ok GEO")
  const street = this.form.controls['street'].value;
  const number = this.form.controls['number'].value;
  const city = this.form.controls['city'].value;
  const state = this.form.controls['state'].value;

return {street, number, city, state}
  // this.getLatLng("Juan Manuel de Rosas", 957, "Rosario", "Santa Fe")
}

setLatLn(lat:string, lng:string){
  this.form.get('geo')?.get('latitude')?.patchValue(lat);
  this.form.get('geo')?.get('longitude')?.patchValue(lng);  
}

getAddress(){

  const query = this.dataFormGeo();
  this.getLatLng(query.street, query.number, query.city, query.state).subscribe((info: any) => {
    console.log(info);
    const lat = info.results[0].geometry.location.lat
    const lng = info.results[0].geometry.location.lng
    this.setLatLn(lat, lng);
  }, error => {
    console.log(error);
  });

  }


 async onSubmit(){

  if(this.add){
    // console.log(this.form.value)
  try{
  const response = await this.partnerServ.addPartner(this.form.value);  
  Swal.fire('', 'The partner was add succesfully', 'success');
  setTimeout(() => {
    this.router.navigate(['/partners']);
  }, 500);
  } catch (error:any) {

    //TODO: error handling with firebase
  if (error.status === 400) {
  Swal.fire('', "the server wasn't process the request", 'error');
  } else {
      Swal.fire(
        'Error',
        "Sorry, we couldn't complete your request",
        'error'
      );
    }
  }
}
  else{
    try{

    const response = await this.partnerServ.updatePartner({
      id         : this.partnerEdit.id,  
      name       : this.form.value.name,
      service    : this.form.value.service, 
      street     : this.form.value.street,
      number     : this.form.value.number,
      city       : this.form.value.city,
      state      : this.form.value.state,
      geo        : new GeoPoint(this.form.get('geo')?.get('latitude')?.value, this.form.get('geo')?.get('longitude')?.value),
      email      : this.form.value.email,
      phone      : this.form.value.phone,
      active     : this.form.value.active    })
    Swal.fire('', 'The partner was edit succesfully', 'success');
      setTimeout(() => {
        this.router.navigate(['/partners']);
      }, 500);
    } catch (error) {
      Swal.fire('', "the server wasn't process the request", 'error');
      // console.error(error)
    }
    this.router.navigate(['/partners']);
  }
}


  cancel() {
    this.router.navigate(['/partners']);
  }

  getLatLng(street:string, number: number, city:string, state:string): Observable<any> {
    const address = `${street} ${number}, ${city}, ${state}, Argentina`;
    return this.mapservice.getCoordFromAddress(address);
  }
}
