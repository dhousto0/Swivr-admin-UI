import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CosmetologistDetailsComponent } from './cosmetologist-details.component';

describe('CosmetologistDetailsComponent', () => {
  let component: CosmetologistDetailsComponent;
  let fixture: ComponentFixture<CosmetologistDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CosmetologistDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CosmetologistDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
