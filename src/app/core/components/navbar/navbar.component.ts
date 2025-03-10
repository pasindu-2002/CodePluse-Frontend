import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/features/Auth/models/user-model';
import { AuthService } from 'src/app/features/Auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user?: User;

  constructor(private authServices: AuthService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.authServices.user().subscribe({
      next: (response) => {
        this.user = response;
      }
    });

   this.user = this.authServices.getUser();
  }

  onLogout(): void {
    this.authServices.logout();
    this.router.navigate(['/']);
  }
}
