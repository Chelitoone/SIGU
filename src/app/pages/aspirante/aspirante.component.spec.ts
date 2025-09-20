import { ComponentFixture, TestBed } from '@angular/core/testing';

import { aspiranteComponent } from './aspirante.component';

describe('aspiranteComponent', () => {
  let component: aspiranteComponent;
  let fixture: ComponentFixture<aspiranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [aspiranteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(aspiranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});