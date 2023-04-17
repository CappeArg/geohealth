import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn:boolean = false;
  user: any

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.userService.getChangeUser().subscribe(user => {
      if (user) {
        // El usuario está logueado, hacer algo aquí
        this.user = user;
        this.isLoggedIn = true;
        // console.log(user)
      } else {
        // El usuario no está logueado, hacer algo aquí
        // console.log("NO ESTA LOGUEADO")
        this.isLoggedIn = false;
      }
    });
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
