
// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { UsuarioService } from '../services/usuario.service';
// import { ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-usuarios-form',
//   templateUrl: './crear-usuario.component.html',
//   styleUrls: ['./crear-usuario.component.css'],
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule]
// })
// export class UsuariosFormComponent {
//   usuarioForm: FormGroup;

//   constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
//     this.usuarioForm = this.fb.group({
//       nombre: ['', Validators.required],
//       correo: ['', [Validators.required, Validators.email]],
//       cedula: ['', Validators.required],
//       passwordhash: ['', Validators.required],
//       rol: ['', Validators.required],
//       programaid: [null, Validators.required] // si es obligatorio, agrega Validators.required
//     });
//   }

//   onSubmit() {
//     if (this.usuarioForm.valid) {
//       this.usuarioService.crearUsuario(this.usuarioForm.value).subscribe({
//         next: (res: any) => {
//           alert(res.message || 'Usuario creado con éxito ✅');
//           this.usuarioForm.reset();
//         },
//         error: (err) => {
//           alert('Error al crear usuario: ' + (err.error?.message || 'Error desconocido'));
//           console.error(err);
//         }
//       });
//     } else {
//       alert('Por favor complete todos los campos requeridos');
//     }
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class UsuariosFormComponent implements OnInit {
  usuarioForm: FormGroup;
  programas: any[] = []; // aquí se guardarán los programas del backend

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private http: HttpClient
  ) {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      cedula: ['', Validators.required],
      passwordhash: ['', Validators.required],
      rol: ['', Validators.required],
      programaid: [null, Validators.required],
      tipoPrograma:['', Validators.required] 
    });
  }

  ngOnInit(): void {
    this.cargarProgramas();
  }
cargarProgramas() {
  this.http.get<any[]>('http://localhost:5122/api/Programas/usuarios-programa')
    .subscribe({
      next: (data) => {
        this.programas = data.map(p => ({
          id: p.programaId,
          nombre: p.programaNombre
        }));

        // 👇 Aquí agregamos el log para ver si realmente se cargaron
        console.log('Programas cargados:', this.programas);
      },
      error: (err) => {
        console.error('Error al cargar programas', err);
      }
    });
}
onSubmit() {
  if (this.usuarioForm.valid) {
    console.log('Datos a enviar:', this.usuarioForm.value); // 
    this.usuarioService.crearUsuario(this.usuarioForm.value).subscribe({
      next: (res: any) => {
        alert(res.message || 'Usuario creado con éxito ✅');
        this.usuarioForm.reset();
      },
      error: (err) => {
        alert('Error al crear usuario: ' + (err.error?.message || 'Error desconocido'));
        console.error(err);
      }
    });
  } else {
    alert('Por favor complete todos los campos requeridos');
  }
}

  // onSubmit() {
  //   if (this.usuarioForm.valid) {
  //     this.usuarioService.crearUsuario(this.usuarioForm.value).subscribe({
  //       next: (res: any) => {
  //         alert(res.message || 'Usuario creado con éxito ✅');
  //         this.usuarioForm.reset();
  //       },
  //       error: (err) => {
  //         alert('Error al crear usuario: ' + (err.error?.message || 'Error desconocido'));
  //         console.error(err);
  //       }
  //     });
  //   } else {
  //     alert('Por favor complete todos los campos requeridos');
  //   }
  // }

}
