import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { Prestamo } from '../interfaces/prestamo.interface';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {

  constructor(private httpService: HttpService) { }

  crearPrestamo(prestamo: { idUsuario: number }) {

    return this.httpService.post<any>('prestamo', prestamo)
  }

  getPrestamos() {
    return this.httpService.get<any>('prestamo')
  }

  getPrestamosByUsuario(id: number) {
    return this.httpService.get<Prestamo>(`prestamo/usuario/${id}`)
  }

  devolverPrestamo(id: number) {
    return this.httpService.patch<any>(`prestamo/${id}`, {devuelto: true})
  }

}
