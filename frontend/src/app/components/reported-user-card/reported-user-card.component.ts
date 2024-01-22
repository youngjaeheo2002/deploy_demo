import { Input } from '@angular/core';
import { Component, EventEmitter, Output } from '@angular/core';
import { StaffService } from 'src/app/services/staff.service';

@Component({
  selector: 'app-reported-user-card',
  templateUrl: './reported-user-card.component.html',
  styleUrls: ['./reported-user-card.component.css'],
})
export class ReportedUserCardComponent {
  @Input() user: any; // Input object with _id and reports array
  @Output() banUserEvent: EventEmitter<string> = new EventEmitter<string>();
  showReports: boolean = false;

  constructor(private staffService: StaffService) {}
  banUser(): void {
    // Implement the logic to ban the user (you may call a service/API here)
    this.staffService.banUser(this.user._id).subscribe((next) => {
      this.banUserEvent.emit(this.user._id);
    });
  }

  resolveUser(): void {
    // Implement the logic to resolve the user (you may call a service/API here)
    this.staffService.resolveUser(this.user._id).subscribe((next) => {
      this.banUserEvent.emit(this.user._id);
    });
  }

  toggleReports(): void {
    this.showReports = !this.showReports;
  }
}
