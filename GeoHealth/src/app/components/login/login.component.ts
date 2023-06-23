import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(private userService: UserService,
              private router:Router) { 
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){

    this.userService.login(this.formLogin.value)
    .then(response=>{
      console.log(response)
      this.router.navigate(['/services']);
    }
    )
    .catch(err => {
      console.log(err)
  })

}

onGoogle(){
  this.userService.loginWithGoogle()
  .then(response=>{
    console.log(response)
    this.router.navigate(['/services']);
  })
  .catch(err=>{
    console.log(err)
  })
}
}
