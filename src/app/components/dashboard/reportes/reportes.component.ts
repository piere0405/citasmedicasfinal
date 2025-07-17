import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';


export interface Reporte {
  id: number;
  titulo: string;
  fecha: string;
  autor: string;
  estado: string;
}

const REPORTES_DATA: Reporte[] = [
  { id: 1, titulo: 'Reporte de ventas Q1', fecha: '2025-01-15', autor: 'Ana García', estado: 'Completado' },
  { id: 2, titulo: 'Reporte financiero anual', fecha: '2025-02-28', autor: 'Luis Pérez', estado: 'Pendiente' },
  { id: 3, titulo: 'Análisis de mercado', fecha: '2025-03-10', autor: 'María Rodríguez', estado: 'En proceso' },
  { id: 4, titulo: 'Reporte de clientes', fecha: '2025-04-05', autor: 'Carlos Sánchez', estado: 'Completado' },
  { id: 5, titulo: 'Informe de calidad', fecha: '2025-04-20', autor: 'Laura López', estado: 'Pendiente' },
];

@Component({
  selector: 'app-reportes',
  imports: [MatTableModule,MatIconModule,MatPaginatorModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'titulo', 'fecha', 'autor', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<Reporte>(REPORTES_DATA);

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