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
      //recupera da url o parametro id
    const IdString = this.route.snapshot.paramMap.get('id');
    if(IdString !== null){
      //converte para int
      this.userId = Number(IdString);
    }
    // pega a publicação 
    this.publicacaoService.getPublicacao(this.userId).subscribe({
      next:(value)=>{
        this.publicacao = value;
      }
    });    
   }

   async registrarResposta(){
    //recupera usuario logado
    const usuario = await this.userService.getUsuarioLogado();

    if(usuario !== null){
      //preenche objeto baseado no usuario logado e na variavel do componetne ligada ao form.
      const usuarioteste = usuario as any;
      let resposta = {
        idDoAutor : usuarioteste.id,
        Descricao : this.respostaConteudo,
      }
      //salva resposta e carrega a nova publicação com todas respostas
      this.respostaService.saveResposta(this.publicacao.id, resposta).subscribe({
        next: (value) => {
          this.publicacaoService.getPublicacao(this.userId).subscribe({
            next:(value)=>{
              this.publicacao = value;
              console.log(this.publicacao);
            }
          });
          //limpa o form de resposta.
          this.respostaConteudo = '';
        },
        error:(err)=> {
          console.log(err);
        },
      })
    }
   }

}
