import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formReg!: FormGroup;

  constructor( private userservice : UserService, private router:Router) {
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
   }

  ngOnInit(): void {
  }

  onSubmit(){
    this.userservice.register(this.formReg.value)
    .then(response=>{
      console.log(response)
      this.router.navigate(['/login']);
    })
    .catch(err => {
      console.log(err)
  });
}

  onGoogle(){
    this.userservice.loginWithGoogle()
    .then(response=>{
      console.log(response)
      this.router.navigate(['/login']);
    })
    .catch(err=>{
      console.log(err)
    })
  }
}