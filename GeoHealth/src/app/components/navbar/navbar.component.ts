import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { canActivate } from '@angular/fire/auth-guard';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
  }

  logOut(){
    this.userService.logout()
    .then(()=>{
      this.router.navigate(['/home'])
    })
    .catch(err=>{
      console.log(err);
    })
  }
  

}
