import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { HealthservService } from 'src/app/services/healthserv.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Services } from '../../interfaces/services';
@Component({
  selector: 'app-modal-services',
  templateUrl: './modal-services.component.html',
  styleUrls: ['./modal-services.component.css']
})
export class ModalServicesComponent implements OnInit {
  serviceEdit:any;
  
  form: FormGroup = this.fb.group({
    name        : ["Name"],
    description : ["Description"]
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
        this.serviceEdit = data
        this.form = this.fb.group({
          name        : [this.serviceEdit.name],
          description : [this.serviceEdit.description]
        })
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
  console.error(error);
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

//  async ngOnInit() {
    
    
//     const customerId = this.route.snapshot.paramMap.get('id');
//     if(customerId === null){
    // this.add=true
//     this.form = {
//       name: 'Name',
//       lastName: 'Last Name',
//       email: 'Email',
//       birthday: new Date(),
//     };
//   }else{
//      this.customer = await this.customerService.viewRecord(customerId);
//      console.log(this.customer)
//      const date = new Date( this.customer.birthday ).toISOString().replace("T00:00:00.000Z", "").replace(" 00:00:00.000Z", "");
//       this.form={
//         name: this.customer.name,
//         lastName: this.customer.lastName,
//         email: this.customer.email,
//         birthday: date
//       }

//   }

//   }

//   async addCustomerForm(formAdd: NgForm) {
//     const customer = formAdd.form.value;
//     customer.birthday = new Date(customer.birthday).toISOString();
//     try {
//     await this.customerService.createRecord(customer);
//     Swal.fire('', 'The customer was add succesfully', 'success');
//     setTimeout(() => {
//       this.router.navigate(['/customers']);
//     }, 500);
//     } catch (error) {
//     if (error.status === 400) {
//     Swal.fire('', "the server wasn't process the request", 'error');
//     } else {
//     console.error(error);
//     }
//     }
//     }    


//   async editCustomerForm(formEdit:NgForm){
//     try {
//       this.customer = formEdit.form.value;
//       this.customer.id = this.route.snapshot.paramMap.get('id')
//       this.customer.birthday = new Date(formEdit.form.value.birthday).toISOString().replace("T00:00:00.000Z", "").replace(" 00:00:00.000Z", "");
  
//       const response = await this.customerService.editRecord(
//         this.customer
//       )
  
//       Swal.fire('', 'The customer was edit succesfully', 'success');
//       setTimeout(() => {
//         this.router.navigate(['/customers']);
//       }, 500);
//     } catch (error) {
//       Swal.fire('', "the server wasn't process the request", 'error');
//       console.error(error)
//     }

//   }
// }
