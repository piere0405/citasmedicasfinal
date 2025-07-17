import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';

export interface Empleado {
  nombre: string;
  apellido: string;
  puesto: string;
  departamento: string;
  email: string;
  telefono: string;
}

const EMPLEADOS_DATA: Empleado[] = [
  { nombre: 'Sofía', apellido: 'Martínez', puesto: 'Gerente', departamento: 'Ventas', email: 'sofia@empresa.com', telefono: '555-1111' },
  { nombre: 'Javier', apellido: 'Torres', puesto: 'Analista', departamento: 'Finanzas', email: 'javier@empresa.com', telefono: '555-2222' },
  { nombre: 'Lucía', apellido: 'Fernández', puesto: 'Diseñadora', departamento: 'Marketing', email: 'lucia@empresa.com', telefono: '555-3333' },
  { nombre: 'Miguel', apellido: 'Gómez', puesto: 'Desarrollador', departamento: 'TI', email: 'miguel@empresa.com', telefono: '555-4444' },
  { nombre: 'Carla', apellido: 'Rivas', puesto: 'Soporte', departamento: 'Atención al Cliente', email: 'carla@empresa.com', telefono: '555-5555' },
];

@Component({
  selector: 'app-empleados',
  imports: [MatPaginatorModule,MatTableModule,MatIconModule],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'puesto', 'departamento', 'email', 'telefono', 'acciones'];
  dataSource = new MatTableDataSource<Empleado>(EMPLEADOS_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}