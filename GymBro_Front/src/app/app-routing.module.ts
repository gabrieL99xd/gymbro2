import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/Complex/login/login.component';
import { UnauthenticatedGuard } from './Guards/UnauthenticatedGuard';
import { RegisterComponent } from './Components/Complex/register/register.component';
import { AuthenticatedGuard } from './Guards/AuthenticatedGuard';
import { GymComponent } from './Components/Complex/gym/gym.component';
import { CriarPublicacaoComponent } from './Components/Complex/criar-publicacao/criar-publicacao.component';
import { VisualizarPublicacaoComponent } from './Components/Complex/visualizar-publicacao/visualizar-publicacao.component';
import { AnotacoesComponent } from './Components/Complex/anotacoes/anotacoes.component';
import { CriarAnotacaoComponent } from './Components/Complex/criar-anotacao/criar-anotacao.component';

const routes: Routes = [
  { path: '', component: HomeComponent , canActivate : [UnauthenticatedGuard] },
  { path: 'Login', component: LoginComponent , canActivate:[UnauthenticatedGuard]},
  { path:'Register' , component:RegisterComponent , canActivate: [UnauthenticatedGuard]},
  { path:'Gym' , component:GymComponent , canActivate: [AuthenticatedGuard]},
  { path:'CriarPublicacao' , component:CriarPublicacaoComponent , canActivate: [AuthenticatedGuard]},
  { path:'Publicacao/:id' , component:VisualizarPublicacaoComponent , canActivate: [AuthenticatedGuard]},
  { path:'Anotacoes' , component:AnotacoesComponent , canActivate: [AuthenticatedGuard]},
  { path:'CriarAnotacao' , component:CriarAnotacaoComponent , canActivate: [AuthenticatedGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
