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
    
    publicacaoService.getAllPublicacao(this.pageSize , this.pageIndex).subscribe({
      next:(value) => {
        this.publicacoes = value;
      }
    });
    publicacaoService.getQtdPublicacao().subscribe({
      next: (value:any) => {
        this.length = value as number;
      }
    });
   }
  
  handlePageEvent(event: PageEvent) {
    this.length = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.publicacaoService.getAllPublicacao(this.pageSize , this.pageIndex).subscribe({
      next:(value) => {
        this.publicacoes = value;
      }
    });
  }

  visualizarPublicacao(id: number) {
    this.router.navigate(['/Publicacao', id]);
   }
}
