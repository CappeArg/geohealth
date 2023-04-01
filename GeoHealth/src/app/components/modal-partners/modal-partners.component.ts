import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PartnerservService } from 'src/app/services/partnerserv.service';
import Swal from 'sweetalert2';
import { Services } from '../../interfaces/services';
import { HealthservService } from '../../services/healthserv.service';

@Component({
  selector: 'app-modal-partners',
  templateUrl: './modal-partners.component.html',
  styleUrls: ['./modal-partners.component.css']
})
export class ModalPartnersComponent implements OnInit {
  partnerEdit:any;
  listServices: Services[] = [];
  
  form: FormGroup = this.fb.group({
    name        : ['', [Validators.required, Validators.maxLength(20)]],
    service     : ['',[]],
    street      : ['',[]],
    number      : ['',[]],
    city        : ['',[]],
    state       : ['',[]],
    email       : ['',[Validators.email]],
    phone       : ['',[]],
    active      : ['',[]]
  })

  add:boolean = false;

  constructor(private partnerServ: PartnerservService,
              private healthservservice: HealthservService,
              private router:Router,
              private route:ActivatedRoute,
              private fb: FormBuilder
              ) {  }
               

ngOnInit() { 
    const partnerId = this.route.snapshot.paramMap.get('id');    
    if(partnerId === null){
      this.add= true

      
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
          email       : [this.partnerEdit.email],
          phone       : [this.partnerEdit.phone],
          active      : [this.partnerEdit.active]

        })
      })

  }

  this.healthservservice.getServices().subscribe((services)=>{

    this.listServices = services;

  })
}

 async onSubmit(){

  if(this.add){
    console.log(this.form.value)
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
  console.error(error);
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
      email      : this.form.value.email,
      phone      : this.form.value.phone,
      active     : this.form.value.active    })
    Swal.fire('', 'The partner was edit succesfully', 'success');
      setTimeout(() => {
        this.router.navigate(['/partners']);
      }, 500);
    } catch (error) {
      Swal.fire('', "the server wasn't process the request", 'error');
      console.error(error)
    }
    this.router.navigate(['/partners']);
  }
}


  cancel() {
    this.router.navigate(['/partners']);
  }
}
