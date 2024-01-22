import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileReportFormComponent } from './profile-report-form.component';

describe('ProfileReportFormComponent', () => {
  let component: ProfileReportFormComponent;
  let fixture: ComponentFixture<ProfileReportFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileReportFormComponent],
    });
    fixture = TestBed.createComponent(ProfileReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
