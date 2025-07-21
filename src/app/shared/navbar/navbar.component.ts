
import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { RouterOutlet } from '@angular/router';
import { ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule,MatButtonModule,MatIconModule, RouterLink,MatMenuModule, MatSidenavModule,MatDividerModule,RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  constructor(private router:Router){}
  logout() {
    
    console.log('Cerrar sesión');
    this.router.navigate(['/login']);
  }
}
