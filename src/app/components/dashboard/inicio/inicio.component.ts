import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  usuarioNombreCompleto: string = '';

  ngOnInit() {
    const usuarioJson = localStorage.getItem('usuarioActual');
    if (usuarioJson) {
      const usuario = JSON.parse(usuarioJson);
      this.usuarioNombreCompleto = `${usuario.nombres}`.trim();
    }
  }
}
