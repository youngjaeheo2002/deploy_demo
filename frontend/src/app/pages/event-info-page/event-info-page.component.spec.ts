import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventInfoPageComponent } from './event-info-page.component';

describe('EventInfoPageComponent', () => {
  let component: EventInfoPageComponent;
  let fixture: ComponentFixture<EventInfoPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventInfoPageComponent],
    });
    fixture = TestBed.createComponent(EventInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
