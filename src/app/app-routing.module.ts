import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PruebaComponent } from './pruebas/prueba/prueba.component';
import { AboutComponent } from './components/about/about.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { FirebaseService } from './servicios/firebase.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegistroComponent },
  { path: 'about', component: AboutComponent },
  { path: 'games', canActivate: [FirebaseService], component: PruebaComponent },
  { path: '', redirectTo: '/about', pathMatch: 'full' },
  { path: '**', redirectTo: '/about', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
