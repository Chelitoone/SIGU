import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramaService {
  private apiUrl = 'https://localhost:5122/api/programas'; // cambia al tuyo

  constructor(private http: HttpClient) {}

  getProgramas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearPrograma(programa: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, programa);
  }
}
