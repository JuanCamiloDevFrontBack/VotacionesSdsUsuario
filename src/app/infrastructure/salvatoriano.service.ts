import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PageResponse, SalvatorianoRequest, SalvatorianoResponse } from '../core/interfaces/salvatoriano.models';


@Injectable({ providedIn: 'root' })
export class SalvatorianoService {
  constructor(private readonly http: HttpClient) {}

  list(page: number, size: number): Observable<PageResponse<SalvatorianoResponse>> {
    const params = new HttpParams().set('page', page).set('size', size).set('sort', 'lastName,asc');
    return this.http.get<PageResponse<SalvatorianoResponse>>(environment.apiRestSalvatorianos, { params });
  }

  getById(id: string): Observable<SalvatorianoResponse> {
    return this.http.get<SalvatorianoResponse>(`${environment.apiRestSalvatorianos}${id}`);
  }

  create(request: SalvatorianoRequest): Observable<SalvatorianoResponse> {
    return this.http.post<SalvatorianoResponse>(environment.apiRestSalvatorianos, request);
  }

  update(id: string, request: SalvatorianoRequest): Observable<SalvatorianoResponse> {
    return this.http.put<SalvatorianoResponse>(`${environment.apiRestSalvatorianos}${id}`, request);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiRestSalvatorianos}${id}`);
  }
}
