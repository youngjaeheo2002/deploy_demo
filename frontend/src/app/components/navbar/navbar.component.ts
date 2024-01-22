import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(
    public api: ApiService,
    private router: Router,
  ) {}

  logout() {
    this.api.signOut().subscribe((next) => {
      this.api.loggedIn = false;
      this.router.navigate(['/']);
    });
  }
}
