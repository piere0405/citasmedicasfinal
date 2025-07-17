import { ChangeDetectionStrategy, signal } from '@angular/core';
import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';  // <-- Importa Router

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, MatIconModule, ReactiveFormsModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  hide = signal(true);
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {  // <-- Inyecta Router
    this.form = this.formBuilder.group({
      nombres: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")]],
      contrasena: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
      ccontrasena: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]]
    });
  }

  registrar() {
    if (this.form.value.contrasena !== this.form.value.ccontrasena) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const nuevoUsuario = {
      nombres: this.form.value.nombres,
      apellidoP: this.form.value.apellidoP,
      apellidoM: this.form.value.apellidoM,
      genero: this.form.value.genero,
      correo: this.form.value.correo.trim().toLowerCase(),
      contrasena: this.form.value.contrasena
    };

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    const correoExiste = usuarios.some((usuario: any) => usuario.correo === nuevoUsuario.correo);

    if (correoExiste) {
      alert('El correo ya está registrado, por favor usa otro.');
      return;
    }

    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Usuario registrado correctamente');
    this.form.reset();
    this.hide.set(true);

    // Redirigir al login
    this.router.navigate(['/login']);
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.preventDefault();
    event.stopPropagation();
  }
}
