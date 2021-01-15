import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayoutManagementComponent } from './payout-management.component';

describe('PayoutManagementComponent', () => {
  let component: PayoutManagementComponent;
  let fixture: ComponentFixture<PayoutManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayoutManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayoutManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
