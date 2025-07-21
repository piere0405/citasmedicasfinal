import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistroComponent {
  hidePassword = signal(true);
  hideConfirmPassword = signal(true);
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      nombres: ['', Validators.required],
      correo: ['', [
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")
      ]],
      contrasena: ['', [
        Validators.required,
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")
      ]],
      ccontrasena: ['', Validators.required]
    }, { validators: this.matchPasswords('contrasena', 'ccontrasena') });
  }

  togglePassword(field: 'password' | 'confirm'): void {
    if (field === 'password') {
      this.hidePassword.set(!this.hidePassword());
    } else {
      this.hideConfirmPassword.set(!this.hideConfirmPassword());
    }
  }

  matchPasswords(passwordKey: string, confirmKey: string): ValidatorFn {
    return (group: AbstractControl): { [key: string]: boolean } | null => {
      const password = group.get(passwordKey)?.value;
      const confirm = group.get(confirmKey)?.value;
      return password === confirm ? null : { passwordMismatch: true };
    };
  }

  registrar(): void {
    if (this.form.invalid) {
      if (this.form.hasError('passwordMismatch')) {
        alert('Las contraseñas no coinciden');
        return;
      }

      if (this.form.controls['correo'].errors?.['pattern']) {
        alert('El correo ingresado no es válido.');
        return;
      }

      if (this.form.controls['contrasena'].errors?.['pattern']) {
        alert('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.');
        return;
      }

      alert('Por favor completa todos los campos correctamente.');
      return;
    }

    const nuevoUsuario = {
      nombres: this.form.value.nombres,
      correo: this.form.value.correo.trim().toLowerCase(),
      contrasena: this.form.value.contrasena
    };

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const correoExiste = usuarios.some((u: any) => u.correo === nuevoUsuario.correo);

    if (correoExiste) {
      alert('El correo ya está registrado, por favor usa otro.');
      return;
    }

    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Usuario registrado correctamente.');
    this.form.reset();
    this.hidePassword.set(true);
    this.hideConfirmPassword.set(true);
    this.router.navigate(['/login']);
  }
}
