import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportedUserCardComponent } from './reported-user-card.component';

describe('ReportedUserCardComponent', () => {
  let component: ReportedUserCardComponent;
  let fixture: ComponentFixture<ReportedUserCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportedUserCardComponent],
    });
    fixture = TestBed.createComponent(ReportedUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
