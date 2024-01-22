import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private api: ApiService) {}
  ngOnInit(): void {
    this.api.getMe().subscribe(
      (next) => {
        this.api.loggedIn = true;
        this.api.userId = next._id;
        this.api.type = next.type;
      },
      (error) => {
        this.api.loggedIn = false;
        this.api.userId = '';
        this.api.type = '';

        this.api.signOut().subscribe();
      },
    );
  }
  title = 'frontend';
}
