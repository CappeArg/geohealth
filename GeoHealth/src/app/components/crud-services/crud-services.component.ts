import { Component, OnInit } from '@angular/core';
import { Services } from 'src/app/interfaces/services';
import { HealthservService } from 'src/app/services/healthserv.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-services',
  templateUrl: './crud-services.component.html',
  styleUrls: ['./crud-services.component.css']
})
export class CrudServicesComponent implements OnInit {
 
  list:Services[];
  collectionName:string = "services"

  constructor( private healthService: HealthservService ) { 
     this.list = []
  }

  ngOnInit(): void {
    Swal.showLoading()
    this.healthService.getAll(this.collectionName).subscribe(services =>{
      this.list = services
      Swal.close()
    },
    error => {
      Swal.fire(
        'Error',
        "Sorry, we couldn't complete your request",
        'error'
      );
    });
  }

  async onClickDelete(service: Services){
    
    const result = await Swal.fire({
      title: 'Are you really sure about it?',
      text: "You won't be able to undo the action",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      const response= await this.healthService.delete(service, this.collectionName);
      console.log(response)
      if (response == undefined) {
        await Swal.fire(
          'Deleted',
          'The service was delete successfully.',
          'success'
        );
   } else {
        await Swal.fire(
          'Error',
          'Error, please try again',
          'error'
        )
      }
    }


  }
}
