import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNationalLeaveComponent } from './dialog-national-leave.component';

describe('DialogNationalLeaveComponent', () => {
  let component: DialogNationalLeaveComponent;
  let fixture: ComponentFixture<DialogNationalLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNationalLeaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNationalLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
