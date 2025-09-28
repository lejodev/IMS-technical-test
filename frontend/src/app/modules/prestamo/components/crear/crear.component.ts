import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/modules/auth/interfaces/usuario.interface';
import { AuthService } from 'src/app/modules/auth/services/auth/auth.service';
import { PrestamoService } from 'src/app/modules/dashboard/services/prestamo.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {

  crearPrestamoForm!: FormGroup

  currentUser: Usuario | null = null
  userSubscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private prestamoService: PrestamoService,
    private authService: AuthService,
    private router: Router) {
    this.crearPrestamoForm = this.fb.group({
      fecha: [null, Validators.required]
    })
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.usuario$.subscribe(user => {
      if (user) {
        const { usuario } = user;
        this.currentUser = usuario;
        console.log('Usuario actual:', usuario);
      } else {
        console.log('No hay usuario autenticado');
      }
    });
  }
  onSubmit() {
    console.log(this.crearPrestamoForm.value);
    if (!this.crearPrestamoForm.valid) {
      this.crearPrestamoForm.markAllAsTouched();
      return;
    }
    console.log('jjj');


    const { fecha } = this.crearPrestamoForm.value;
    const userId = this.currentUser?.id;
    if (!userId) {
      console.error('No hay autenticadousuario ');
      this.router.navigate(['/sign-in']);
      return;
    }
    console.log('idUsuario:', userId);

    console.log(fecha);



  }
}
