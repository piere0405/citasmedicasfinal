import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productos',
  standalone: true,
 imports: [
  CommonModule,
  MatCardModule,
  MatPaginatorModule
],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  totalItems = 50;
  pageSize = 5;
  currentPage = 0;

  // Datos simulados
  metricas: any[] = Array.from({ length: 50 }, (_, i) => ({
    nombre: `Médico ${i + 1}`,
    citas: Math.floor(Math.random() * 50 + 1),
    promedioAtencion: `${Math.floor(Math.random() * 20 + 5)} min`
  }));

  get paginatedData() {
    const start = this.currentPage * this.pageSize;
    return this.metricas.slice(start, start + this.pageSize);
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
  }
}
