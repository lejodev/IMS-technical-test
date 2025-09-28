import { Component, OnInit } from '@angular/core';
import { PrestamoService } from '../services/prestamo.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/services/auth/auth.service';
import { Router } from '@angular/router';
import { Usuario } from '../../auth/interfaces/usuario.interface';
import { Prestamo } from '../interfaces/prestamo.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentUser: Usuario | null = null
  private userSubscription: Subscription = new Subscription();

  public prestamos: Prestamo[] = [];
  public defaultMessage: string = 'No hay préstamos para este usuario.';
  public rol: string = '';

  constructor(
    private prestamoService: PrestamoService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userSubscription = this.authService.usuario$.subscribe(async user => {
      if (user) {
        const { usuario } = user;
        this.currentUser = usuario;
        console.log('Usuario actual:', usuario);
        if (usuario.esAdmin) {
          this.LoadAllLoans();
          this.rol = 'Administrador';
        } else {
          this.loadLoansByUser();
          this.rol = 'Usuario';
        }

      } else {
        console.log('No hay usuario autenticado');
        this.router.navigate(['/sign-in']);
      }

    });

  }

  LoadAllLoans() {
    this.prestamoService.getPrestamos().subscribe(data => {
      this.prestamos = data as Prestamo[];
      console.log(this.prestamos);
    });
  }

  loadLoansByUser() {
    const userId = this.currentUser?.id;
    if (!userId) {
      console.error('No hay usuario autenticado');
      this.router.navigate(['/sign-in']);
      return;
    }
    this.prestamoService.getPrestamosByUsuario(userId).subscribe(data => {
      this.prestamos = data as Prestamo[];
      console.log(this.prestamos);
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  generarPrestamo() {
    const userId = this.currentUser?.id
    if (typeof userId !== 'number') {
      console.error('No hay usuario autenticado');
      return
    }
    this.prestamoService.crearPrestamo({ idUsuario: userId }).subscribe({
      next: (res) => {
        console.log('Préstamo creado:', res);
        this.loadLoansByUser();
        alert('Préstamo creado con éxito');
      },
      error: (err) => {
        alert('Error creando prestamo, intente de nuevo');
        console.error(err);
      }
    });
  }
  devolverPrestamo(id: number) {
    if (!id) {
      console.error('ID de préstamo inválido');
      return;
    }
    console.log('id prestamo', id);

    this.prestamoService.devolverPrestamo(id).subscribe({
      next: (res) => {
        console.log('Préstamo devuelto:', res);
        if (this.currentUser?.esAdmin) {
          this.LoadAllLoans()
        } else {
          this.loadLoansByUser();
        }
        alert('Préstamo devuelto con éxito');
      },
      error: (err) => {
        alert('Error devolviendo préstamo, intente de nuevo');
        console.error(err);
      }
    });
  }
}
