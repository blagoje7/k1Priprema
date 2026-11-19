import { Routes } from '@angular/router';
import { MagaciniStrana } from './pages/magacini-strana/magacini-strana';
import { RobaStrana } from './pages/roba-strana/roba-strana';

export const routes: Routes = [
  { path: '', redirectTo: 'magacini', pathMatch: 'full' },
  { path: 'magacini', component: MagaciniStrana },
  { path: 'roba', component: RobaStrana },
  { path: '**', redirectTo: 'magacini' },
];
