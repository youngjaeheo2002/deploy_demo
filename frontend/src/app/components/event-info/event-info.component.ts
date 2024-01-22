import { Component, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LimeEvent } from 'src/app/classes/limeEvent';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.css'],
})
export class EventInfoComponent {
  @Input() event!: LimeEvent;
  @Input() user!: User;
  userJoined: boolean = false;
  userInterestedUsernames: string[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    if (this.event.interestedUsers.includes(this.api.userId)) {
      this.userJoined = true;
    }

    this.event.interestedUsers.forEach((userId: string) => {
      this.api.getUserById(userId).subscribe((next) => {
        this.userInterestedUsernames.push(next.username);
      });
    });

    const date: Date = new Date(this.event.eventDate);
    if (date.toISOString() === this.event.eventDate) {
      this.event.eventDate = date.toLocaleString();
    }
  }

  joinEvent() {
    this.api.joinEvent(this.event._id, this.api.userId).subscribe((next) => {
      this.userJoined = true;
      this.api.getUserById(this.api.userId).subscribe((next) => {
        this.userInterestedUsernames.push(next.username);
      });
    });
  }

  leaveEvent() {
    this.api.leaveEvent(this.event._id, this.api.userId).subscribe((next) => {
      this.userJoined = false;
      this.api.getUserById(this.api.userId).subscribe((next) => {
        this.userInterestedUsernames = this.userInterestedUsernames.filter(
          (username) => username != next.username,
        );
      });
    });
  }
}
