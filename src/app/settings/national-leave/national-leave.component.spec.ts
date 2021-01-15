import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalLeaveComponent } from './national-leave.component';

describe('NationalLeaveComponent', () => {
  let component: NationalLeaveComponent;
  let fixture: ComponentFixture<NationalLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NationalLeaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NationalLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
