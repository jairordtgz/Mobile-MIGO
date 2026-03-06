import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/'; 

  constructor(private http: HttpClient) { }

  login(credenciales: any): Observable<any> {
    return this.http.post(`${this.apiUrl}login/`, credenciales);
  }

  registrarConductor(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}api/movil/usuario/registrar-conductor/`, datos); 
  }

  registrarVehiculo(conductor_id: number, token: string, formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });
    return this.http.post(`${this.apiUrl}api/movil/usuario/${conductor_id}/registrar-vehiculo/`, formData, { headers });
  }

  obtenerCampanasPublicas(): Observable<any> {
    return this.http.get(`${this.apiUrl}api/movil/usuario/conductor/ver-campanias/ `);
  }
}