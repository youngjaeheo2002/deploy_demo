import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-event-add-form',
  templateUrl: './event-add-form.component.html',
  styleUrls: ['./event-add-form.component.css'],
})
export class EventAddFormComponent {
  eventForm: any;
  error: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      eventName: ['', [Validators.required]],
      eventDescription: ['', [Validators.required]],
      eventDate: [new Date().toISOString().slice(0, -8), [Validators.required]],
      eventLocation: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.error = '';
    if (this.eventForm.invalid) {
      return;
    }
    const values = this.eventForm.value;
    this.api
      .addEvent(
        values.eventName,
        values.eventDescription,
        values.eventDate,
        values.eventLocation,
        this.api.userId,
      )
      .subscribe((next) => {
        this.router.navigate(['/event-home']);
      });
  }
}
