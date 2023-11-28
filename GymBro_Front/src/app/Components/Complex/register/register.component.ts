import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GymBro_Usuario } from 'src/app/Entities/Entities';
import { CepService } from 'src/app/Services/CEP/cep.service';
import { UserService } from 'src/app/Services/User/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  
  registerForm: FormGroup;

  constructor(public cepService : CepService, public router : Router , private userService : UserService){
    this.registerForm = new FormGroup({
      login: new FormControl('', [Validators.required ]),
      password: new FormControl('', [Validators.required ]),
      apelido: new FormControl('', [Validators.required ]),
      CEP : new FormControl(),
      bairro: new FormControl(),
      logradouro: new FormControl(),
      localidade: new FormControl(),
    });
  }

  onCepChange(event : any) {
    let cep = event.target.value;
    // quando o cep for igual a 8 caracteres.
    if (cep && cep.length >= 8) {
      event.target.value = cep.slice(0, 8);
      // garante que o input e o cep terão somente 8 caracteres
      cep = cep.slice(0,8);
      //Consulta cep e preenche no formulario.
      this.cepService.consultarCep(cep).subscribe((data: any) => {
        this.registerForm.get('bairro')?.setValue(data.bairro);
        this.registerForm.get('logradouro')?.setValue(data.logradouro);
        this.registerForm.get('localidade')?.setValue(data.localidade);
      });

    }
  }

  register() : void {
    //preenche objeto , pegando info do form preenchido.
    const user : GymBro_Usuario = {
      Id:0,
      Usuario: this.registerForm.get('login')!.value,
      Senha: this.registerForm.get('password')!.value,
      Apelido : this.registerForm.get('apelido')!.value,
      CEP : String(this.registerForm.get('CEP')?.value ?? ''),
      Bairro : this.registerForm.get('bairro')?.value ?? '',
      Logradouro : this.registerForm.get('logradouro')?.value ?? '',
      Localidade : this.registerForm.get('localidade')?.value ?? ''
    };
    //joga para o serviço consultar a api e registrar o novo usuario.
    this.userService.criarUsuario(user);
  }
}
