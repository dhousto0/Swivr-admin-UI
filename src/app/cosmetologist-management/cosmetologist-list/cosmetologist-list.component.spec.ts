import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CosmetologistListComponent } from './cosmetologist-list.component';

describe('CosmetologistListComponent', () => {
  let component: CosmetologistListComponent;
  let fixture: ComponentFixture<CosmetologistListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CosmetologistListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CosmetologistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
