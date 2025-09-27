import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosProgramaComponent } from './usuarios-programa.component';

describe('UsuariosProgramaComponent', () => {
  let component: UsuariosProgramaComponent;
  let fixture: ComponentFixture<UsuariosProgramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosProgramaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
