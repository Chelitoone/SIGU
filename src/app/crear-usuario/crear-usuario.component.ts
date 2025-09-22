import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent {
  usuarioForm: FormGroup;
  usuarioService: any;

  constructor(private fb: FormBuilder) { //esto es para los formularios reactivos
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      cedula: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      correo: ['', [Validators.required, Validators.email]],
      rol: ['', Validators.required],
      programa: ['', Validators.required],
    });
  }
onSubmit() {
  if (this.usuarioForm.valid) {
    this.usuarioService.crearUsuario(this.usuarioForm.value).subscribe({
      next: (res: any) => {
        console.log("✅ Usuario creado:", res);
        alert("Usuario creado con éxito");
        this.usuarioForm.reset();
      },
      error: (err: any) => {
        console.error("❌ Error:", err);
        alert("Error al crear usuario");
      }
    });
  }
  // onSubmit() { //esto es para cuando se envie el formulario
  //   if (this.usuarioForm.valid) {
  //     console.log("Usuario creado:", this.usuarioForm.value);
  //     alert("✅ Usuario creado correctamente");
  //     this.usuarioForm.reset();
  //   } else {
  //     alert("❌ Por favor completa todos los campos correctamente.");
  //   }
  // }
}}
