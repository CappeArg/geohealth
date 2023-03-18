import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
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

  // customer: any;
  form:FormGroup;
  add:boolean = false;

  constructor(private healthService: HealthservService,
              private router:Router,
              // private route:ActivatedRoute
              ) {
                this.form = new FormGroup({
                  name: new FormControl(),
                  description: new FormControl()
                })
               }

  ngOnInit(): void {  }

  async onSubmit(){
    console.log(this.form.value)
  const response = await this.healthService.addService(this.form.value);
  this.router.navigate(['/services']);
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
