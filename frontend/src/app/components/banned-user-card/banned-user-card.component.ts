import { Component, Input } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { StaffService } from 'src/app/services/staff.service';

@Component({
  selector: 'app-banned-user-card', // Update the selector to 'app-banned-user-card'
  templateUrl: './banned-user-card.component.html', // Update the template URL
  styleUrls: ['./banned-user-card.component.css'], // Update the styles URL
})
export class BannedUserCardComponent {
  // Update the class name to BannedUserCardComponent
  @Input() user: any; // Input object with user data
  @Output() update: EventEmitter<string> = new EventEmitter<string>();
  constructor(private staffService: StaffService) {}

  unbanUser(): void {
    this.staffService.unbanUser(this.user._id).subscribe((next) => {
      this.update.emit('hello');
    });
  }
}
