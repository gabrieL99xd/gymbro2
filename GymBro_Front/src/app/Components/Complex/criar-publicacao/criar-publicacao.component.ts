import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Publicacao } from 'src/app/Entities/Entities';
import { PublicacaoService } from 'src/app/Services/Publicacao/publicacao.service';
import { TokenService } from 'src/app/Services/Token/token.service';
import { UserService } from 'src/app/Services/User/user.service';


@Component({
  selector: 'app-criar-publicacao',
  templateUrl: './criar-publicacao.component.html',
  styleUrls: ['./criar-publicacao.component.scss']
})
export class CriarPublicacaoComponent {

  publicacaoForm: FormGroup;

  constructor(private publicacaoService : PublicacaoService , private userService : UserService , private tokenService : TokenService) {
    //Validadores para o form.
    this.publicacaoForm = new FormGroup({
      Titulo: new FormControl('', [Validators.required ]),
      Descricao: new FormControl('', [Validators.required ]),
    });
  }

  async register() {
    //Pega o usuario logado  usando o service.
    const usuario = await this.userService.getUsuarioLogado();
    // caso não seja nulo
    if(usuario !== null){
      //Busca informações do form e preenche o objeto.
      const publicacao : Publicacao = {
        Id : 0,
        Titulo : this.publicacaoForm.get('Titulo')!.value,
        Descricao : this.publicacaoForm.get('Descricao')!.value,
        Autor : usuario,
        Respostas : [],
      }
      //Chama o serviço para registrar publicaçõ
      this.publicacaoService.registrarPublicacao(publicacao);
    }
  }
}