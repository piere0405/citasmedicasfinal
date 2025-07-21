import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';

export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  rol: 'admin' | 'medico' | 'paciente';
  password: string;
}

const USUARIOS_INICIALES: Usuario[] = [
  { id: 1, nombre: 'Juan Pérez', correo: 'juanperez@mail.com', rol: 'admin', password: 'admin123' },
  { id: 2, nombre: 'Dra. Ana Gómez', correo: 'ana.gomez@mail.com', rol: 'medico', password: 'medico123' },
  { id: 3, nombre: 'Carlos Ruiz', correo: 'carlosruiz@mail.com', rol: 'paciente', password: 'paciente123' },
];

@Component({
  selector: 'app-usuarios',
  standalone: true,
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule,
  ],
})
export class EmpleadosComponent implements OnInit, AfterViewInit {
  columnas: string[] = ['nombre', 'correo', 'rol', 'acciones'];
  dataSource = new MatTableDataSource<Usuario>(USUARIOS_INICIALES);

  usuarioActual: Partial<Usuario> = {};
  editando: boolean = false;
  notificacion: string = '';

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  guardarUsuario() {
    if (
      !this.usuarioActual.nombre ||
      !this.usuarioActual.correo ||
      !this.usuarioActual.rol ||
      !this.usuarioActual.password
    ) {
      this.mostrarNotificacion('Por favor, complete todos los campos incluyendo la contraseña.');
      return;
    }

    if (this.editando && this.usuarioActual.id != null) {
      // Actualizar usuario existente
      const index = this.dataSource.data.findIndex(u => u.id === this.usuarioActual.id);
      if (index !== -1) {
        this.dataSource.data[index] = {
          id: this.usuarioActual.id,
          nombre: this.usuarioActual.nombre,
          correo: this.usuarioActual.correo,
          rol: this.usuarioActual.rol,
          password: this.usuarioActual.password,
        } as Usuario;
        this.dataSource.data = [...this.dataSource.data];
        this.mostrarNotificacion('Usuario actualizado con éxito.');
      }
    } else {
      // Crear nuevo usuario
      const nuevoUsuario: Usuario = {
        id: this.generarId(),
        nombre: this.usuarioActual.nombre,
        correo: this.usuarioActual.correo,
        rol: this.usuarioActual.rol,
        password: this.usuarioActual.password,
      } as Usuario;
      this.dataSource.data = [...this.dataSource.data, nuevoUsuario];
      this.mostrarNotificacion('Usuario creado con éxito.');
    }

    this.usuarioActual = {};
    this.editando = false;
  }

  editarUsuario(usuario: Usuario) {
    this.usuarioActual = { ...usuario };
    this.editando = true;
  }

  cancelarEdicion() {
    this.usuarioActual = {};
    this.editando = false;
  }

  eliminarUsuario(usuario: Usuario) {
    if (confirm(`¿Estás seguro que deseas eliminar al usuario "${usuario.nombre}"?`)) {
      this.dataSource.data = this.dataSource.data.filter(u => u.id !== usuario.id);
      this.mostrarNotificacion('Usuario eliminado con éxito.');
      if (this.editando && this.usuarioActual.id === usuario.id) {
        this.cancelarEdicion();
      }
    }
  }

  mostrarNotificacion(msg: string) {
    this.notificacion = msg;
    setTimeout(() => (this.notificacion = ''), 4000);
  }

  generarId(): number {
    return this.dataSource.data.length > 0
      ? Math.max(...this.dataSource.data.map(u => u.id)) + 1
      : 1;
  }
}
