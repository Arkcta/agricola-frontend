import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncargadosBPAComponent } from './encargados-bpa.component';

describe('EncargadosBPAComponent', () => {
  let component: EncargadosBPAComponent;
  let fixture: ComponentFixture<EncargadosBPAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncargadosBPAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncargadosBPAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
