import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService, Usuario } from '../services/usuario.service';

@Component({
  selector: 'app-listar-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-usuarios.component.html'
})
export class ListarUsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (err) => {
        console.error('❌ Error al obtener usuarios', err);
      }
    });
  }
}
