import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.signInForm = this.fb.group({
      cedula: ['', [Validators.required]],
      contrasena: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      const { cedula, contrasena } = this.signInForm.value;
      console.log(cedula, contrasena);
      
      this.authService.signIn({ cedula, contrasena }).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          console.log(res);
          
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          alert('Error al iniciar sesión. Por favor, verifica tus credenciales.');
          console.error(err);
        }
      });
    }
  }
}
