import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user: User = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
  };
  constructor(private auth:AuthService,private router:Router){
    

  }

  onSubmit() {
    this.auth.register(this.user).subscribe({
      next: (response) => {
        console.log('register successful:', response);
          this.router.navigate(['login'])
        },
      error: (error) => {
        console.error('register error:', error);
      },
    });

    this.auth.register(this.user)
    this.user = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: ''
    };
  }
}

