import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CampaniaList } from '../interfaces/campania';

export interface CampaniaResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CampaniaList[];
}

@Injectable({
  providedIn: 'root',
})

export class CampaniasService {
  constructor(private http: HttpClient) { }
  getCampanias(): Observable<CampaniaList[]> {
    return this.http.get<CampaniaList[]>('http://localhost:8000/api/movil/usuario/conductor/ver-campanias/');
  }
}
