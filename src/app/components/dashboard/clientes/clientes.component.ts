import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

export interface Cita {
  id_paciente: string;
  id_medico: string;
  fecha: Date;
  hora: string;
  estado: string;
  diagnostico?: string;
}

const CITAS_DATA: Cita[] = [
  { id_paciente: 'P001', id_medico: 'M001', fecha: new Date(2025, 6, 23), hora: '14:30', estado: 'Pendiente', diagnostico: 'Gripe' },
  { id_paciente: 'P002', id_medico: 'M002', fecha: new Date(2025, 6, 22), hora: '09:00', estado: 'Confirmada', diagnostico: 'Dolor de cabeza' },
  { id_paciente: 'P003', id_medico: 'M001', fecha: new Date(2025, 6, 25), hora: '10:00', estado: 'Pendiente' },
];

@Component({
  selector: 'app-registro-citas',
  standalone: true,
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class ClientesComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id_paciente', 'id_medico', 'fecha', 'hora', 'estado', 'diagnostico', 'acciones'];
  dataSource = new MatTableDataSource<Cita>(CITAS_DATA);
  notificacion: string = '';

  nuevaCita: Partial<Cita> = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.verificarCitasProximas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  reservarCita() {
  if (!this.nuevaCita.id_paciente || !this.nuevaCita.id_medico || !this.nuevaCita.fecha || !this.nuevaCita.hora) {
    this.mostrarNotificacion('Por favor, complete todos los campos para reservar.');
    return;
  }

  // Convertir fecha a Date (si viene como string)
  const fechaCita = new Date(this.nuevaCita.fecha);

  // Verificamos disponibilidad con fecha convertida
  if (!this.estaDisponible(this.nuevaCita.id_medico!, fechaCita, this.nuevaCita.hora!)) {
    this.mostrarNotificacion('La fecha y hora no están disponibles para este médico.');
    return;
  }

  const nueva: Cita = {
    id_paciente: this.nuevaCita.id_paciente!,
    id_medico: this.nuevaCita.id_medico!,
    fecha: fechaCita,
    hora: this.nuevaCita.hora!,
    estado: 'Pendiente',
    diagnostico: '',
  };
  this.dataSource.data = [...this.dataSource.data, nueva];
  this.mostrarNotificacion('Cita reservada con éxito.');
  this.nuevaCita = {};
}

estaDisponible(id_medico: string, fecha: Date, hora: string): boolean {
  // Comparar sólo año, mes y día, ignorar hora y minutos para fecha
  const mismaFecha = (fecha1: Date, fecha2: Date) => {
    return (
      fecha1.getFullYear() === fecha2.getFullYear() &&
      fecha1.getMonth() === fecha2.getMonth() &&
      fecha1.getDate() === fecha2.getDate()
    );
  };

  // Buscar si ya existe una cita para ese médico, fecha y hora, y no esté cancelada
  const existeConflicto = this.dataSource.data.some(cita =>
    cita.id_medico === id_medico &&
    mismaFecha(cita.fecha, fecha) &&
    cita.hora === hora &&
    cita.estado !== 'Cancelada'
  );

  // Para depuración (puedes quitar luego)
  console.log('Verificando disponibilidad para:', id_medico, fecha.toDateString(), hora);
  console.log('Conflicto encontrado:', existeConflicto);

  return !existeConflicto;
}

  cancelarCita(cita: Cita) {
    cita.estado = 'Cancelada';
    this.mostrarNotificacion(`La cita con el Dr. ${cita.id_medico} fue cancelada.`);
  }

  reprogramarCita(cita: Cita) {
    const nuevaFecha = new Date(cita.fecha);
    nuevaFecha.setDate(nuevaFecha.getDate() + 1); // Demo: día siguiente
    cita.fecha = nuevaFecha;
    cita.estado = 'Reprogramada';
    this.mostrarNotificacion(`La cita fue reprogramada para el ${nuevaFecha.toLocaleDateString()}.`);
  }

  mostrarNotificacion(msg: string) {
    this.notificacion = msg;
    setTimeout(() => this.notificacion = '', 8000); // Notificación dura 8 segundos
  }

  verificarCitasProximas() {
    const hoy = new Date();
    const citasProximas = this.dataSource.data.filter(cita => {
      const diferencia = (cita.fecha.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24);
      return diferencia <= 1 && diferencia >= 0 && cita.estado !== 'Cancelada';
    });

    if (citasProximas.length > 0) {
      const mensajes = citasProximas.map(cita => `Recuerda tu cita con el Dr. ${cita.id_medico} es pronto.`).join(' ');
      this.mostrarNotificacion(mensajes);
    }
  }
}
