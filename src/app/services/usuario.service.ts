import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id?: number;       // opcional porque lo genera el backend
  nombre: string;
  cedula: string;
  correo: string;
  passwordhash: string;
  rol: string;
  programaid: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:5122/api/usuarios'; // tu backend .NET

  constructor(private http: HttpClient) {}

  // POST - crear usuario
  crearUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  // GET - listar usuarios
  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }
}
