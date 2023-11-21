import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GymBro_Usuario, Publicacao, Resposta } from 'src/app/Entities/Entities';
import { PublicacaoService } from 'src/app/Services/Publicacao/publicacao.service';
import { RespostasService } from 'src/app/Services/Respostas/respostas.service';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-visualizar-publicacao',
  templateUrl: './visualizar-publicacao.component.html',
  styleUrls: ['./visualizar-publicacao.component.scss']
})
export class VisualizarPublicacaoComponent {

  userId = 0;
  publicacao : any ;
  respostaConteudo :string = '';

  constructor(private route: ActivatedRoute , 
    private publicacaoService : PublicacaoService , 
    private respostaService : RespostasService , 
    private userService: UserService) {

    const IdString = this.route.snapshot.paramMap.get('id');
    if(IdString !== null){
      this.userId = Number(IdString);
    }

    this.publicacaoService.getPublicacao(this.userId).subscribe({
      next:(value)=>{
        this.publicacao = value;
      }
    });    
   }

   async registrarResposta(){

    const usuario = await this.userService.getUsuarioLogado();

    if(usuario !== null){
      const usuarioteste = usuario as any;
      let resposta = {
        idDoAutor : usuarioteste.id,
        Descricao : this.respostaConteudo,
      }
      this.respostaService.saveResposta(this.publicacao.id, resposta).subscribe({
        next: (value) => {
          this.publicacaoService.getPublicacao(this.userId).subscribe({
            next:(value)=>{
              this.publicacao = value;
              console.log(this.publicacao);
            }
          });
          this.respostaConteudo = '';
        },
        error:(err)=> {
          console.log(err);
        },
      })
    }
   }

}
