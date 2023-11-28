import { Component, OnChanges, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { Publicacao } from 'src/app/Entities/Entities';
import { PublicacaoService } from 'src/app/Services/Publicacao/publicacao.service';

@Component({
  selector: 'app-gym',
  templateUrl: './gym.component.html',
  styleUrls: ['./gym.component.scss']
})
export class GymComponent {
  length = 0;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = true;
  publicacoes: any[] = [];

  constructor(private publicacaoService : PublicacaoService , private router : Router) {
    //Garante o preenchimento das publicações baseados na informação da primeira página.
    publicacaoService.getAllPublicacao(this.pageSize , this.pageIndex).subscribe({
      next:(value) => {
        this.publicacoes = value;
      }
    });
    //Pega o total de publicações
    publicacaoService.getQtdPublicacao().subscribe({
      next: (value:any) => {
        this.length = value as number;
      }
    });
   }
  //Esse evento irá lidar com a troca de qualquer elemento da paginação
  handlePageEvent(event: PageEvent) {
    //Realoca as variaveis baseadas na informação que o usuario preencheu.
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    //Traz as publicações baseadas nas informações atuais
    this.publicacaoService.getAllPublicacao(this.pageSize , this.pageIndex).subscribe({
      next:(value) => {
        this.publicacoes = value;
      }
    });
  }
  //Garante que irá para a rota de Publicação , passsando id na url
  visualizarPublicacao(id: number) {
    this.router.navigate(['/Publicacao', id]);
   }
}
