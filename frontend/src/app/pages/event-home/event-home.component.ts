import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LimeEvent } from 'src/app/classes/limeEvent';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-event-home',
  templateUrl: './event-home.component.html',
  styleUrls: ['./event-home.component.css'],
})
export class EventHomeComponent {
  events!: LimeEvent[];
  largeEvent!: LimeEvent | false;
  allEvents: boolean = true;
  showFilterForm: boolean = false;
  searchText: string = '';

  constructor(
    protected api: ApiService,
    private library: FaIconLibrary,
  ) {
    library.addIcons(faSliders);
  }

  ngOnInit(): void {
    this.api.getEvents().subscribe((next) => {
      this.events = next;
      this.updateEventsList();
    });
  }

  updateEventsList() {
    console.log(this.events);
    if (this.events.length > 0) {
      this.largeEvent = this.events[0];
      this.events = this.events.slice(1);
    } else {
      this.largeEvent = false;
      console.log('No events found');
    }
  }

  getMyEvents() {
    this.api.getEvents(this.api.userId).subscribe((next) => {
      this.events = next;
      this.updateEventsList();
      this.allEvents = false;
    });
  }

  getAllEvents() {
    this.api.getEvents().subscribe((next) => {
      this.events = next;
      this.updateEventsList();
      this.allEvents = true;
    });
  }

  getEventsByName() {
    if (this.searchText == '') {
      this.getAllEvents();
      return;
    }
    this.api
      .getEventsByName(this.searchText, this.allEvents)
      .subscribe((next) => {
        this.events = next;
        console.log(this.events);
        this.updateEventsList();
      });
  }

  clearSearch() {
    this.searchText = '';
    if (this.allEvents) {
      this.getAllEvents();
    } else {
      this.getMyEvents();
    }
  }

  filterEvents(filter: {
    filterDateMin: string;
    filterDateMax: string;
    filterLocation: string;
  }) {
    let userId = '';
    if (!this.allEvents) {
      userId = this.api.userId;
    }
    this.api
      .getEvents(
        userId,
        [],
        filter.filterDateMin,
        filter.filterDateMax,
        filter.filterLocation,
      )
      .subscribe((next) => {
        this.events = next;
        this.updateEventsList();
      });
  }
}
