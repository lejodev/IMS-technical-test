import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { BehaviorSubject, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioSubject = new BehaviorSubject<any>(null);
  usuario$ = this.usuarioSubject.asObservable();

  constructor(private httpService: HttpService) { this.getUserFromToken() }

  signIn(usuario: Usuario) {
    return this.httpService.post<any>('auth/signin', usuario).pipe(tap(res => { this.setToken(res.token) }));
  }

  private setToken(token: string) {
    localStorage.setItem('token', token);
    this.getUserFromToken();
  }

  private getUserFromToken() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = jwtDecode<any>(token);
        this.usuarioSubject.next(payload);  //Acà se actualiza el behaviorsubject para hacerlo visible a cualquier suscriptor de la variable usuario$
      } catch (error) {
        console.error('Token invalido', error);
        this.usuarioSubject.next(null);
      }
    }
    else {
      this.usuarioSubject.next(null);
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.usuarioSubject.next(null);
  }
}
