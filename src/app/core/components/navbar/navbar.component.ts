import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/features/Auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private authServices: AuthService) {}

  ngOnInit(): void {
    this.authServices.user().subscribe({
      next: (response) => {
        console.log(response);
      },
    });
  }
}
