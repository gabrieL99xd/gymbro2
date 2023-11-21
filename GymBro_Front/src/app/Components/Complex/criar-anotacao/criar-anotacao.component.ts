import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Anotacao } from 'src/app/Entities/Entities';
import { AnotacaoService } from 'src/app/Services/Anotacao/anotacao.service';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-criar-anotacao',
  templateUrl: './criar-anotacao.component.html',
  styleUrls: ['./criar-anotacao.component.scss']
})
export class CriarAnotacaoComponent {

  anotacaoForm: FormGroup;

  constructor(private anotacaoService : AnotacaoService , private userService : UserService) {
    this.anotacaoForm = new FormGroup({
      Titulo: new FormControl('', [Validators.required ]),
      Descricao: new FormControl('', [Validators.required ]),
    });
  }

  async register() {
    const usuarioLogado = await this.userService.getUsuarioLogado();
    if(usuarioLogado !== null){
      const anotacao : Anotacao = {
        Id : 0,
        Titulo : this.anotacaoForm.get('Titulo')!.value,
        Descricao : this.anotacaoForm.get('Descricao')!.value,
        Autor : usuarioLogado,
      }
      this.anotacaoService.saveAnotacao(anotacao);
    }
  }

}
