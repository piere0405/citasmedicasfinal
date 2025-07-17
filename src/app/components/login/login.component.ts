import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

export interface Usuario {
  nombres: string;
  apellidoP: string;
  apellidoM: string;
  genero: string;
  correo: string;
  contrasena: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  hide = signal(true);

  constructor(private formbuilder: FormBuilder, private router: Router) {
    // ✅ Validaciones mínimas: solo requerido
    this.form = this.formbuilder.group({
      correo: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.preventDefault();
    event.stopPropagation();
  }

  ingresar() {
    const correoIngresado = this.form.value.correo.trim();
    const contrasenaIngresada = this.form.value.contrasena.trim();

    const usuarios: Usuario[] = JSON.parse(localStorage.getItem('usuarios') || '[]');

    const usuarioEncontrado = usuarios.find(
      (u) => u.correo === correoIngresado && u.contrasena === contrasenaIngresada
    );

    if (
      usuarioEncontrado ||
      (correoIngresado === 'admin@gmail.com' && contrasenaIngresada === 'Admin123&')
    ) {
      const usuarioActual = usuarioEncontrado || {
        nombres: 'Admin',
        apellidoP: '',
        apellidoM: '',
        genero: '',
        correo: correoIngresado,
        contrasena: contrasenaIngresada
      };

      localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));
      this.router.navigate(['/dashboard']);
    } else {
      alert('Correo o contraseña incorrectos');
    }
  }
}
