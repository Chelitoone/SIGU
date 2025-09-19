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

  constructor(private fb: FormBuilder) { //esto es para los formularios reactivos
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      cedula: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      correo: ['', [Validators.required, Validators.email]],
      rol: ['', Validators.required],
      programa: ['', Validators.required],
    });
  }

  onSubmit() { //esto es para cuando se envie el formulario
    if (this.usuarioForm.valid) {
      console.log("Usuario creado:", this.usuarioForm.value);
      alert("✅ Usuario creado correctamente");
      this.usuarioForm.reset();
    } else {
      alert("❌ Por favor completa todos los campos correctamente.");
    }
  }
}
