import { Routes } from '@angular/router';
import { ColaboradoresComponent } from './features/colaboradores/colaboradores.component';
import { EmpresasComponent } from './features/empresas/empresas.component';
import { PaisesComponent } from './features/paises/paises.component';
import { DepartamentosComponent } from './features/departamentos/departamentos.component';
import { MunicipiosComponent } from './features/municipios/municipios.component';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  { path: 'paises', component: PaisesComponent },
  { path: 'departamentos', component: DepartamentosComponent },
  { path: 'municipios', component: MunicipiosComponent },
  { path: 'empresas', component: EmpresasComponent },
  { path: 'colaboradores', component: ColaboradoresComponent},
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];
