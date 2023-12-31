import { Component, OnInit } from '@angular/core';
import { PartnerservService } from '../../services/partnerserv.service';
import { Partners } from '../../interfaces/partners';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-partners',
  templateUrl: './crud-partners.component.html',
  styleUrls: ['./crud-partners.component.css']
})
export class CrudPartnersComponent implements OnInit {

  list:Partners[];
  collectionName:string = "partners"

  constructor(private partnerServ: PartnerservService) {
    this.list = []

   }

  ngOnInit(): void {
    Swal.showLoading()
    this.partnerServ.getAll(this.collectionName).subscribe(partners =>{
      this.list = partners
      Swal.close();
    },
    error => {
      Swal.fire(
        'Error',
        "Sorry, we couldn't complete your request",
        'error'
      );
    });
  }

  async onClickDelete(partner: Partners){
    
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
      const response= await this.partnerServ.delete(partner,this.collectionName);
      console.log(response)
      if (response == undefined) {
        await Swal.fire(
          'Deleted',
          'The partner was delete successfully.',
          'success'
        );
   } else {
        await Swal.fire(
          'Error',
          'Error, please try again',
          'error'
        );  
      }
    }


  }

}
