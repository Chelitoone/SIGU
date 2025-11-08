import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ListarUsuariosComponent } from './listar-usuarios.component';
import { Usuario, UsuarioService } from '../services/usuario.service';


describe('ListarUsuariosComponent', () => {
  let component: ListarUsuariosComponent;
  let fixture: ComponentFixture<ListarUsuariosComponent>;

  const MockUsuarioService: any = {
    obtenerUsuarios: jasmine.createSpy('obtenerUsuarios').and.returnValue(of([
      { id: 1, nombre: 'Juan', correo: 'test@test.com', rol: 'admin', programaid: 1 },
      { id: 2, nombre: 'Ana', correo: 'hola', rol: 'estudiante', programaid: 2 }
    ])),
    editarUsuario: jasmine.createSpy('editarUsuario').and.returnValue(of({ message: 'Usuario actualizado correctamente' })),
    eliminarUsuario: jasmine.createSpy('eliminarUsuario').and.returnValue(of({ message: 'Usuario eliminado correctamente' }))
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarUsuariosComponent],
      providers: [
        { provide: UsuarioService, useValue: MockUsuarioService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListarUsuariosComponent);
    component = fixture.componentInstance;
  });


  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('deberia cagar usuarios)')

  it('debería cargar usuarios en ngOnInit', () => {
    component.ngOnInit();
    expect(MockUsuarioService.obtenerUsuarios).toHaveBeenCalled();
    expect(component.usuarios.length).toBe(2);
    expect(component.usuarios[0].nombre).toBe('Juan');
  });


  it('debería asignar correctamente el usuario en edición', () => {
    const usuario = { id: 1, nombre: 'Juan' };
    component.editar(usuario);
    expect(component.usuarioEnEdicionId).toBe(1);
    expect(component.usuarioEditado.nombre).toBe('Juan');
  });


  it('debería cancelar la edición correctamente', () => {
    component.usuarioEnEdicionId = 1;
    component.usuarioEditado = { nombre: 'Juan' };

    component.cancelarEdicion();
    expect(component.usuarioEnEdicionId).toBeNull();
    expect(component.usuarioEditado).toEqual({});
  });



  it('debería manejar error al guardar usuario', () => {
    spyOn(window, 'alert');
    MockUsuarioService.editarUsuario.and.returnValue(throwError(() => new Error('Error en PUT')));

    component.usuarioEditado = { id: 1, nombre: 'Error' };
    component.guardarEdicion();

    expect(window.alert).toHaveBeenCalledWith('Error al actualizar usuario');
  });


  it('debería eliminar usuario después de confirmación', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(window, 'alert');
    spyOn(component, 'cargarUsuarios');

    component.eliminar(1);

    expect(MockUsuarioService.eliminarUsuario).toHaveBeenCalledWith(1);
    expect(window.alert).toHaveBeenCalledWith('Usuario eliminado correctamente');
    expect(component.cargarUsuarios).toHaveBeenCalled();
  });


  it('no debería eliminar usuario si el usuario cancela la confirmación', () => {
    spyOn(window, 'confirm').and.returnValue(false);

    component.eliminar(1);

    expect(MockUsuarioService.eliminarUsuario).not.toHaveBeenCalled();
  });
});
