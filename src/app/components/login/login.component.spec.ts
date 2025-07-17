import {ChangeDetectionStrategy, signal} from '@angular/core';
import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';



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
  imports: [MatFormFieldModule,MatButtonModule,MatIconModule,MatInputModule,ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup;
  hide = signal(true);
  constructor(private formbuilder: FormBuilder,private router: Router){
    this.form= this.formbuilder.group({
     correo:['',[Validators.required,Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")]],
     contrasena:['',[Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]]
    })
 }
/*
 ingresar(){
   
  const correoIngresado = this.form.value.correo.trim();
  const contrasenaIngresada = this.form.value.contrasena.trim();

  const correoValido = 'admin@gmail.com';
  const contrasenaValida = 'Admin123&';
  console.log(this.form.value.correo+":"+this.form.value.contrasena)

  if (
    correoIngresado === correoValido &&
    contrasenaIngresada === contrasenaValida
  ) {
   
    this.router.navigate(['/dashboard']);
  } else {
    alert('Correo o contraseña incorrectos');
  }
 }*/
  
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.preventDefault();  
    event.stopPropagation();
  }
  
  ingresar() {
    const correoIngresado = this.form.value.correo.trim();
    const contrasenaIngresada = this.form.value.contrasena.trim();
  
    
    const usuarios: Usuario[] = JSON.parse(localStorage.getItem('usuarios') || '[]');
  
   
    const usuarioEncontrado = usuarios.find(u => 
      u.correo === correoIngresado && u.contrasena === contrasenaIngresada
    );

    
  
    if (usuarioEncontrado|| correoIngresado === 'admin@gmail.com' && contrasenaIngresada === 'Admin123&') {
      
      this.router.navigate(['/dashboard']);
    } else {
      alert('Correo o contraseña incorrectos');
    }
  }

}
