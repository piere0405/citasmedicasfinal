import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';

export interface Cliente {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
}

const CLIENTES_DATA: Cliente[] = [
  { nombre: 'Ana', apellido: 'García', email: 'ana@gmail.com', telefono: '555-1234' },
  { nombre: 'Luis', apellido: 'Pérez', email: 'luis@hotmail.com', telefono: '555-5678' },
  { nombre: 'María', apellido: 'Rodríguez', email: 'maria@yahoo.com', telefono: '555-8765' },
  { nombre: 'Carlos', apellido: 'Sánchez', email: 'carlos@gmail.com', telefono: '555-4321' },
  { nombre: 'Laura', apellido: 'López', email: 'laura@outlook.com', telefono: '555-6789' },
];

@Component({
  selector: 'app-clientes',
  imports: [MatTableModule, MatIconModule,MatPaginatorModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})

export class ClientesComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'email', 'telefono', 'acciones'];
  dataSource = new MatTableDataSource<Cliente>(CLIENTES_DATA);

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