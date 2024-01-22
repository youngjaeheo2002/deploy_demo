import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-event-filter-form',
  templateUrl: './event-filter-form.component.html',
  styleUrls: ['./event-filter-form.component.css'],
})
export class EventFilterFormComponent {
  @Output() filter = new EventEmitter<{
    filterDateMin: string;
    filterDateMax: string;
    filterLocation: string;
  }>();
  filterForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
  ) {
    this.filterForm = this.formBuilder.group({
      filterDateMin: [new Date().toISOString().slice(0, -8)],
      filterDateMax: [new Date().toISOString().slice(0, -8)],
      filterLocation: [''],
    });
  }

  ngOnInit() {
    this.api.getEvents('', ['eventDate', 'asc']).subscribe((next) => {
      let min: string = next.at(0)?.eventDate ?? new Date().toISOString();
      let max: string = next.at(-1)?.eventDate ?? new Date().toISOString();
      this.filterForm.patchValue({
        filterDateMin: min.slice(0, -8),
        filterDateMax: max.slice(0, -8),
      });
    });
  }

  onFilter() {
    this.filter.emit(this.filterForm.value);
  }
}
