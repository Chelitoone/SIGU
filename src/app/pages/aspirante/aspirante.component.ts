import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

const STORAGE_KEY = 'inscritos_aspirante_v1';

@Component({
  selector: 'app-aspirante',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './aspirante.component.html',
  styleUrls: ['./aspirante.component.css'],
})
export class aspiranteComponent implements OnInit {
  aspiranteForm: FormGroup;
  cicloLectivo: FormControl;
  nombre: FormControl;
  cedula: FormControl;
  correo: FormControl;
  rol: FormControl;
  programa: FormControl;

  inscritos: any[] = [];
  showInscritos = false;

  // índice del registro que se está editando; null = modo creación
  editingIndex: number | null = null;

  constructor() {
    // Mantener ciclo por defecto tal como pediste
    this.cicloLectivo = new FormControl('2025-2');
    this.nombre = new FormControl('', Validators.required);
    this.cedula = new FormControl('', Validators.required);
    this.correo = new FormControl('', [Validators.required, Validators.email]);
    this.rol = new FormControl('', Validators.required);
    this.programa = new FormControl('', Validators.required);

    this.aspiranteForm = new FormGroup({
      cicloLectivo: this.cicloLectivo,
      nombre: this.nombre,
      cedula: this.cedula,
      correo: this.correo,
      rol: this.rol,
      programa: this.programa,
    });
  }

  ngOnInit(): void {
    this.loadFromStorage();
  }

  // ---- Persistencia ----
  private saveToStorage(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.inscritos));
    } catch (err) {
      console.error('Error guardando inscritos en localStorage', err);
    }
  }

  private loadFromStorage(): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // Validar que sea un arreglo
        if (Array.isArray(parsed)) {
          this.inscritos = parsed;
        } else {
          // si no es correcto, limpiar clave errónea
          console.warn('Clave de storage inválida, se reiniciará.');
          localStorage.removeItem(STORAGE_KEY);
          this.inscritos = [];
        }
      }
    } catch (err) {
      console.error('Error leyendo inscritos desde localStorage', err);
      this.inscritos = [];
    }
  }

  // ---- Lógica del formulario ----
  handleSubmit(): void {
    if (this.aspiranteForm.invalid) {
      this.aspiranteForm.markAllAsTouched();
      return;
    }

    const formValue = { ...this.aspiranteForm.value };

    if (this.editingIndex !== null) {
      // actualizar registro existente
      this.inscritos[this.editingIndex] = formValue;
      console.log('Actualizado:', formValue);
      this.editingIndex = null;
    } else {
      // crear nuevo registro
      this.inscritos.push(formValue);
      console.log('Registrado:', formValue);
    }

    // guardar cambios en localStorage
    this.saveToStorage();

    // reiniciar formulario, conservando ciclo por defecto
    const cicloDefault = this.cicloLectivo.value || '2025-2';
    this.aspiranteForm.reset({ cicloLectivo: cicloDefault });

    // mostrar inscritos tras acción
    this.showInscritos = true;
  }

  toggleInscritos(): void {
    this.showInscritos = !this.showInscritos;
  }

  editInscrito(index: number): void {
    const item = this.inscritos[index];
    if (!item) return;
    // setValue para rellenar todo el formulario (asegura que las keys existan)
    this.aspiranteForm.setValue({
      cicloLectivo: item.cicloLectivo ?? '2025-2',
      nombre: item.nombre ?? '',
      cedula: item.cedula ?? '',
      correo: item.correo ?? '',
      rol: item.rol ?? '',
      programa: item.programa ?? '',
    });

    this.editingIndex = index;
    this.showInscritos = true;
  }

  cancelEdit(): void {
    this.editingIndex = null;
    // resetear formulario manteniendo ciclo
    const cicloDefault = this.cicloLectivo.value || '2025-2';
    this.aspiranteForm.reset({ cicloLectivo: cicloDefault });
  }

  deleteInscrito(index: number): void {
    const item = this.inscritos[index];
    if (!item) return;

    const confirmar = window.confirm(`¿Eliminar a "${item.nombre}" (cédula: ${item.cedula})? Esta acción no se puede deshacer.`);
    if (!confirmar) return;

    this.inscritos.splice(index, 1);

    // guardar cambios en localStorage
    this.saveToStorage();

    // Si estabas editando ese registro, cancelar edición
    if (this.editingIndex !== null) {
      if (this.editingIndex === index) {
        this.cancelEdit();
      } else if (this.editingIndex > index) {
        // ajustar índice si borraste una fila antes de la que editabas
        this.editingIndex = this.editingIndex - 1;
      }
    }
  }
}
