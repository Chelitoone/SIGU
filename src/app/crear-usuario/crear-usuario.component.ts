import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Usuario } from '../interfaces/usuario.interface'; // <-- importar interfaz

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent {
  usuarioForm: FormGroup;
  usuarios: Usuario[] = []; // lista de usuarios tipada

  constructor(private fb: FormBuilder) {
    this.usuarioForm = this.fb.group({
      rol: ['', Validators.required],
      id: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      nombre_completo: ['', [Validators.required, Validators.minLength(3)]],
      edad: ['', [Validators.required, Validators.min(16)]],
      celular: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      sexo: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      programa: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.usuarioForm.valid) {
      const nuevoUsuario: Usuario = this.usuarioForm.value; // <-- tipado fuerte
      this.usuarios.push(nuevoUsuario); // guardar en lista de usuarios
      console.log("Usuario creado:", nuevoUsuario);
      alert("✅ Usuario creado correctamente");
      this.usuarioForm.reset();
    } else {
      this.usuarioForm.markAllAsTouched();
      alert("❌ Por favor completa todos los campos correctamente.");
    }
  }
}
