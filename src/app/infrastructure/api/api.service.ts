import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  base = '/api';
  constructor(private http: HttpClient) {}

  get<T>(path: string) {
    return this.http.get<T>(`${this.base}/${path}`);
  }

  post<T>(path: string, body: any) {
    return this.http.post<T>(`${this.base}/${path}`, body);
  }
}
