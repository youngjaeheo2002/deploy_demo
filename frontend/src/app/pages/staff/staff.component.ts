import { Component, OnInit } from '@angular/core';
import { StaffService } from 'src/app/services/staff.service';
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css'],
})
export class StaffComponent implements OnInit {
  activeView: string = 'reports'; // Default active view is 'reports'
  reports: any = [];
  bannedUsers: any = [];

  constructor(private staffService: StaffService) {}
  ngOnInit(): void {
    this.staffService.getReportedUsers().subscribe((next) => {
      this.reports = next;
      console.log(this.reports);
    });
    this.fetchBannedUsers();
  }
  toggleView(view: string): void {
    if (view !== this.activeView) {
      if (view === 'reports') {
        this.fetchReports();
      } else {
        this.fetchBannedUsers();
      }
    }
    this.activeView = view;
  }

  fetchReports() {
    this.staffService.getReportedUsers().subscribe((next) => {
      this.reports = next;
      console.log(this.reports);
    });
  }

  fetchBannedUsers() {
    this.staffService.getBannedUsers().subscribe((next) => {
      this.bannedUsers = next;
    });
  }
}
