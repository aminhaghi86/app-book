import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { HeaderSharedService } from 'src/app/services/header-shared.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: User = { username: '' };
  constructor(
    private auth: AuthService,
    private router: Router,
    private headerService: HeaderSharedService
  ) {}

  ngOnInit() {
    this.headerService.setShowHeader(false);
  }
  onSubmit() {
    this.auth.login(this.user).subscribe({
      next: (response) => {
        this.auth.storeToken(response.token);
        this.router.navigate(['']);
      },
      error: (error) => {
        console.error('Login error:', error);
      },
    });
    this.user = {
      username: '',
    };
  }
}
