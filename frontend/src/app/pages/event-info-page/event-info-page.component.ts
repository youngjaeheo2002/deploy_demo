import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { LimeEvent } from 'src/app/classes/limeEvent';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-event-info-page',
  templateUrl: './event-info-page.component.html',
  styleUrls: ['./event-info-page.component.css'],
})
export class EventInfoPageComponent {
  event!: LimeEvent;
  user!: User;

  constructor(
    protected api: ApiService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.api.getEventById(params['id']).subscribe((next) => {
        this.event = next;
        this.api.getUserById(this.event.userId).subscribe((next) => {
          this.user = next;
        });
      });
    });
  }
}
