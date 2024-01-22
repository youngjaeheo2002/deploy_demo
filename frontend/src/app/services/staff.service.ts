import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { Observable, Subscription, last } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { LimeEvent } from '../classes/limeEvent';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  apiEndPoint = environment.apiEndpoint + '/api/staff';

  constructor(private http: HttpClient) {}

  getReportedUsers() {
    return this.http.get(this.apiEndPoint + '/usersandreports');
  }

  banUser(userId: string) {
    return this.http.patch(
      this.apiEndPoint + '/ban',
      { bannedId: userId },
      { withCredentials: true },
    );
  }

  unbanUser(userId: string) {
    return this.http.patch(
      this.apiEndPoint + '/unban',
      { unbannedId: userId },
      { withCredentials: true },
    );
  }

  resolveUser(userId: string) {
    return this.http.patch(
      this.apiEndPoint + '/resolve',
      { userId: userId },
      { withCredentials: true },
    );
  }

  getBannedUsers() {
    return this.http.get(this.apiEndPoint + '/banned', {
      withCredentials: true,
    });
  }
}
