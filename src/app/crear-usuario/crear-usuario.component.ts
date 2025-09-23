// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormBuilder, FormGroup, Validators,ReactiveFormsModule} from '@angular/forms';
// import { UsuarioService } from '../services/usuario.service';


// @Component({
//   selector: 'app-crear-usuario',
//   standalone: true,
//   imports: [ReactiveFormsModule, CommonModule,],
//   templateUrl: './crear-usuario.component.html',
//   styleUrls: ['./crear-usuario.component.css']
// })
// export class CrearUsuarioComponent {
//   usuarioForm: FormGroup;

//   // constructor(private fb: FormBuilder      ) 
  
  
//   constructor(
//     private fb: FormBuilder,
//     private usuarioService: UsuarioService,
//     private router: Router   // 👈 INYECTA EL ROUTER AQUÍ
//   )
  
//   { //esto es para los formularios reactivos
//     this.usuarioForm = this.fb.group({
//       nombre: ['', [Validators.required, Validators.minLength(3)]],
//       cedula: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
//       passwordHash:'',
//       correo: ['', [Validators.required, Validators.email]],
//       rol: ['', Validators.required],
//       programaid: ['', Validators.required],
//     });
//   }
  
//  onSubmit() {
//     if (this.usuarioForm.valid) {
//       this.usuarioService.crearUsuario(this.usuarioForm.value).subscribe({
//         next: () => {
//           // ✅ Redirigir después de crear
//           this.router.navigate(['/usuarios']);
//         },
//         error: (err: any) => {
//           console.error('Error al crear usuario', err);
//         },
//       });
//     }
//   }
//   }
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class UsuariosFormComponent {
  usuarioForm: FormGroup;

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      cedula: ['', Validators.required],
      passwordhash: ['', Validators.required],
      rol: ['', Validators.required],
      programaid: [null, Validators.required] // si es obligatorio, agrega Validators.required
    });
  }

  onSubmit() {
    if (this.usuarioForm.valid) {
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
}
