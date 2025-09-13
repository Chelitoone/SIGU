import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AspiranteComponent } from './aspirante.component';

describe('AspiranteComponent', () => {
  let component: AspiranteComponent;
  let fixture: ComponentFixture<AspiranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AspiranteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AspiranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
