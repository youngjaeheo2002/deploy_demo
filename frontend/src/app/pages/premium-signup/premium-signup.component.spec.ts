import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumSignupComponent } from './premium-signup.component';

describe('PremiumSignupComponent', () => {
  let component: PremiumSignupComponent;
  let fixture: ComponentFixture<PremiumSignupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PremiumSignupComponent],
    });
    fixture = TestBed.createComponent(PremiumSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
