import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';

import { HeaderComponent } from './Components/Simple/header/header.component';
import { FooterComponent } from './Components/Simple/footer/footer.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/Complex/login/login.component';
import { RegisterComponent } from './Components/Complex/register/register.component';
import { GymComponent } from './Components/Complex/gym/gym.component';
import { CriarPublicacaoComponent } from './Components/Complex/criar-publicacao/criar-publicacao.component';
import { VisualizarPublicacaoComponent } from './Components/Complex/visualizar-publicacao/visualizar-publicacao.component';
import { AnotacoesComponent } from './Components/Complex/anotacoes/anotacoes.component';
import { CriarAnotacaoComponent } from './Components/Complex/criar-anotacao/criar-anotacao.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    GymComponent,
    CriarPublicacaoComponent,
    VisualizarPublicacaoComponent,
    AnotacoesComponent,
    CriarAnotacaoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule,
    MatCardModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
