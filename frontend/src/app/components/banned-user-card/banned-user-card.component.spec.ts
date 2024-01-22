import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannedUserCardComponent } from './banned-user-card.component';

describe('BannedUserCardComponent', () => {
  let component: BannedUserCardComponent;
  let fixture: ComponentFixture<BannedUserCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BannedUserCardComponent],
    });
    fixture = TestBed.createComponent(BannedUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
