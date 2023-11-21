import { Component } from '@angular/core';
import { AnotacaoService } from 'src/app/Services/Anotacao/anotacao.service';

@Component({
  selector: 'app-anotacoes',
  templateUrl: './anotacoes.component.html',
  styleUrls: ['./anotacoes.component.scss']
})
export class AnotacoesComponent {

  anotacoes : any;

  constructor(private anotacaoService : AnotacaoService){
    this.anotacaoService.getAllAnotacoes().subscribe({
      next:(value)=>{
        this.anotacoes = value;
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
}
