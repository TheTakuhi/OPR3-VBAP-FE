import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Motorcycle } from './motorcycle';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class MotorcycleService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getMotorcycles(): Observable<Motorcycle[]> {
    return this.http.get<Motorcycle[]>(`${this.apiServerUrl}/motorcycles/all`);
  }

  public addMotorcycle(motorcycle: Motorcycle): Observable<Motorcycle> {
    return this.http.post<Motorcycle>(`${this.apiServerUrl}/motorcycles/add`, motorcycle);
  }

  public updateMotorcycle(motorcycle: Motorcycle): Observable<Motorcycle> {
    return this.http.put<Motorcycle>(`${this.apiServerUrl}/motorcycles/update`, motorcycle);
  }

  public deleteMotorcycle(motorcycleId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/motorcycles/delete/${motorcycleId}`);
  }
}
