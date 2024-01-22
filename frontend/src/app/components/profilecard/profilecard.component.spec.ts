import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilecardComponent } from './profilecard.component';

describe('ProfilecardComponent', () => {
  let component: ProfilecardComponent;
  let fixture: ComponentFixture<ProfilecardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilecardComponent],
    });
    fixture = TestBed.createComponent(ProfilecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
