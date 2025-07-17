import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';

export interface Producto {
  codigo: string;
  nombre: string;
  categoria: string;
  precio: number;
  stock: number;
}

const PRODUCTOS_DATA: Producto[] = [
  { codigo: 'P001', nombre: 'Laptop', categoria: 'Electrónica', precio: 1200, stock: 15 },
  { codigo: 'P002', nombre: 'Teléfono', categoria: 'Electrónica', precio: 800, stock: 30 },
  { codigo: 'P003', nombre: 'Camiseta', categoria: 'Ropa', precio: 20, stock: 100 },
  { codigo: 'P004', nombre: 'Zapatos', categoria: 'Calzado', precio: 50, stock: 60 },
  { codigo: 'P005', nombre: 'Mochila', categoria: 'Accesorios', precio: 40, stock: 25 },
];


@Component({
  selector: 'app-productos',
  imports: [MatPaginatorModule,MatTableModule,MatIconModule,CommonModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {
  displayedColumns: string[] = ['codigo', 'nombre', 'categoria', 'precio', 'stock', 'acciones'];
  dataSource = new MatTableDataSource<Producto>(PRODUCTOS_DATA);

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