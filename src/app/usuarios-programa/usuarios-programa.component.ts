import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-programas-usuarios',
  templateUrl: './usuarios-programa.component.html'
})
export class ProgramasUsuariosComponent implements OnInit {
  programasConUsuarios: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarProgramasConUsuarios();
  }

  cargarProgramasConUsuarios() {
    this.http.get<any[]>('http://localhost:5122/api/Programas/usuarios-programa')
      .subscribe(data => this.programasConUsuarios = data);
  }
}
