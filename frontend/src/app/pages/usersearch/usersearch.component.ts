import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-usersearch',
  templateUrl: './usersearch.component.html',
  styleUrls: ['./usersearch.component.css'],
})
export class UsersearchComponent {
  loading: boolean = false;
  searchText: string = '';
  searchResults: any = [];

  constructor(private api: ApiService) {}

  onInputChange() {
    this.loading = true;
    // Perform search logic here
    console.log('Search text:', this.searchText);
    this.api.userSearch(this.searchText).subscribe(
      (next) => {
        this.loading = false;
        this.searchResults = next;
      },
      (error) => {
        this.loading = false;
      },
    );
  }

  clearSearch() {
    this.searchText = '';
    this.searchResults = [];
  }
}
