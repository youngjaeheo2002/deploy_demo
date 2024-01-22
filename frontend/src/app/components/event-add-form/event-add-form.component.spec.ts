import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAddFormComponent } from './event-add-form.component';

describe('EventAddFormComponent', () => {
  let component: EventAddFormComponent;
  let fixture: ComponentFixture<EventAddFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventAddFormComponent],
    });
    fixture = TestBed.createComponent(EventAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
