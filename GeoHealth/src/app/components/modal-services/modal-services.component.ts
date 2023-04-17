import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HealthservService } from 'src/app/services/healthserv.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-modal-services',
  templateUrl: './modal-services.component.html',
  styleUrls: ['./modal-services.component.css']
})
export class ModalServicesComponent implements OnInit {
  serviceEdit:any;
  
  form: FormGroup = this.fb.group({
    name        : ["Name", [Validators.required, Validators.maxLength(20)]],
    description : ["Description", [Validators.required, Validators.maxLength(140)]]
  })
  // customer: any;
  add:boolean = false;
 
  constructor(private healthService: HealthservService,
              private router:Router,
              private route:ActivatedRoute,
              private fb: FormBuilder
              ) {    }
               

ngOnInit() { 
    const serviceId = this.route.snapshot.paramMap.get('id');    
    if(serviceId === null){
      this.add= true

      
   }
   else{
      this.add = false
      this.healthService.getService(serviceId).subscribe(data=>{
        Swal.showLoading()
        this.serviceEdit = data
        Swal.close()
        this.form = this.fb.group({
          name        : [this.serviceEdit.name],
          description : [this.serviceEdit.description]
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
}

 async onSubmit(){

  if(this.add){
    console.log(this.form.value)
  try{
    const response = await this.healthService.addService(this.form.value);  
  Swal.fire('', 'The service was add succesfully', 'success');
  setTimeout(() => {
    this.router.navigate(['/services']);
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
    const response = await this.healthService.updateService({
      id: this.serviceEdit.id,
      name: this.form.value.name,
      description:this.form.value.description
    })
    Swal.fire('', 'The customer was edit succesfully', 'success');
      setTimeout(() => {
        this.router.navigate(['/services']);
      }, 500);
    } catch (error) {
      Swal.fire('', "the server wasn't process the request", 'error');
      console.error(error)
    }
    this.router.navigate(['/services']);
  }
}


  cancel() {
    this.router.navigate(['/services']);
  }
}