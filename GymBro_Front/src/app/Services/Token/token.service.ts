import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  hasToken(): boolean {
    const token = localStorage.getItem('GymBroToken');
    return !!token; // Retorna true se o token existir, caso contrário, retorna false
  }

  getToken(): string | null{
    return localStorage.getItem('GymBroToken');
  }

  saveToken(token: string): void {
    localStorage.setItem('GymBroToken', token); //Salva o token.
  }

  removeToken(): void{
    localStorage.removeItem('GymBroToken');//Remove o token.
  }
  
}
