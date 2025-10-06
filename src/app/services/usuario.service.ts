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
  private apiUrl = 'http://localhost:5122/api/Usuarios'; // tu backend .NET

  constructor(private http: HttpClient) {}

  // POST - crear usuario
  crearUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }
 

  editarUsuario(id: number, usuario: any) {
  return this.http.put<any>(`http://localhost:5122/api/usuarios/${id}`, usuario);
}

    // Eliminar usuario
eliminarUsuario(id: number) {
  return this.http.delete<any>(`http://localhost:5122/api/usuarios/${id}`);
}
  // GET - listar usuarios
  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

// CREACION FORMULARIO 

  //APARTADO PARA LOS PROGRAMAS

  getProgramas() {
  return this.http.get<any[]>(`${this.apiUrl}/programas`);
}

getUsuariosPorProgramaId(programaId: number) {
  return this.http.get<any[]>(`${this.apiUrl}/programas/${programaId}/usuarios`);
}

}
