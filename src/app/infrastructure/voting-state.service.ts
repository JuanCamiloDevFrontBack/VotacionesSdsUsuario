import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

export interface VotingStateResponse {
  active: boolean;
}

@Injectable({ providedIn: 'root' })
export class VotingStateService {

  readonly base = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getVotingActive() {
    return this.http.get<any>(`${this.base}/votacion`);
  }

  updateVotingActive(data: any) {
    return this.http.put<any>(`${this.base}/votacion`, data);
  }

  postVotingActive<T>(path: string, body: any) {
    return this.http.post<T>(`${this.base}/${path}`, body);
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
