import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'auth_token';

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  clear() {
    localStorage.removeItem(this.tokenKey);
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
