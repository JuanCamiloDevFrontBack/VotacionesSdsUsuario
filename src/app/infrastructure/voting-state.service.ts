import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface VotingStateResponse {
  activa: boolean;
}

@Injectable({ providedIn: 'root' })
export class VotingStateService {
  constructor(private http: HttpClient) {}

  getVotingActive(): Observable<boolean> {
    return this.http
      .get<VotingStateResponse>(`${environment.apiRestAuth}votacion`)
      .pipe(map((response: VotingStateResponse) => response.activa));
  }

  updateVotingActive(data: VotingStateResponse) {
    return this.http.put<any>(`${environment.apiRestAuth}votacion`, data);
  }

  postVotingActive<T>(path: string, body: any) {
    return this.http.post<T>(`${environment.apiRestAuth}${path}`, body);
  }

  // Test
  generarEnlace(telefono: string, mensaje: string): string {
    // Eliminamos espacios, guiones o el signo '+' por si el usuario los ingresa
    const telefonoLimpio = telefono.replace(/[^0-9]/g, '');

    // Codificamos el texto para que sea seguro en una URL (revierte espacios a %20, etc.)
    const mensajeCodificado = encodeURIComponent(mensaje);

    return `https://wa.me/${telefonoLimpio}?text=${mensajeCodificado}`;
    //return `https://whatsapp.com/${telefonoLimpio}?text=${mensajeCodificado}`;
  }

  sendMessageWhatsappUrl(phoneNumber: string, message: string) {
    const url = this.generarEnlace(phoneNumber, message);
    window.open(url, '_blank');
  }
}
