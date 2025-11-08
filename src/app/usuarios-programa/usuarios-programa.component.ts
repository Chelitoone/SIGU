import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-usuarios-programa',
  standalone: true,
  imports: [CommonModule, FormsModule], // 👈 orden correcto
  templateUrl: './usuarios-programa.component.html',
  styleUrls: ['./usuarios-programa.component.css']
})
export class UsuariosProgramaComponent implements OnInit {
  nombre: string = '';
  usuarios: any[] = [];
  mensaje: string = '';

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.buscarUsuario('').subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: () => {
        this.mensaje = 'Error al cargar usuarios.';
      }
    });
  }

  buscarUsuario() {
    if (!this.nombre.trim()) {
      this.cargarUsuarios();
      return;
    }

    this.usuarioService.buscarUsuario(this.nombre).subscribe({
      next: (data) => {
        this.usuarios = data;
        this.mensaje = data.length === 0 ? 'No se encontraron usuarios.' : '';
      },
      error: () => {
        this.usuarios = [];
        this.mensaje = 'Error al buscar usuarios.';
      }
    });
  }
}


