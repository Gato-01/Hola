import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3001/api'; // URL del backend

  constructor(private http: HttpClient) { }

  // Método para iniciar sesión
  login(credenciales: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credenciales);
  }
}