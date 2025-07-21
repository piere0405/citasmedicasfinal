import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegistroComponent } from './components/registro/registro.component';
import { InicioComponent } from './components/dashboard/inicio/inicio.component';
import { ClientesComponent } from './components/dashboard/clientes/clientes.component';
import { EmpleadosComponent } from './components/dashboard/empleados/empleados.component';
import { ProductosComponent } from './components/dashboard/productos/productos.component';


export const routes: Routes = [
    {path:'',component: LoginComponent},
    {path:'login',component: LoginComponent},
    {path:'registro',component: RegistroComponent},
    {path:'dashboard', component: DashboardComponent,children:[
        {path:'', component:InicioComponent},
        {path:'clientes',component:ClientesComponent},
        {path:'empleados',component:EmpleadosComponent},
        {path:'productos',component:ProductosComponent}

    ]}
];
