import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from '../Token/token.service';
import { GymBroUrl } from 'src/app/API/url';
import { GymBro_Usuario } from 'src/app/Entities/Entities';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = GymBroUrl + 'GymBro_Usuario';
  urlAutenticar = this.url + '/Autenticar';

  constructor(public http : HttpClient , public tokenService : TokenService , private router: Router) { }

  async getUsuarioLogado() : Promise<GymBro_Usuario | null> {
    //pega do local token armazenado
    const token = this.tokenService.getToken() ?? '';
    const decoded = jwtDecode(token) as any;
    const id = decoded.Id;
    //recupera o id do usuario
    let usuario : GymBro_Usuario | null = null;
    //recupera usuario baseado no id.
    try {
      const response = await this.http.get(this.url+ '/' + id).toPromise();
      return response as GymBro_Usuario;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

 // Método para criar um novo usuário
 criarUsuario(usuario: GymBro_Usuario) {

  this.http.post(this.url, usuario).subscribe({
    next: (value) => {
      this.router.navigate(['/Login']);
    },
    error: err => console.log(err),
    }
  );

}

// Método para autenticar um usuário
autenticarUsuario(usuario: {Usuario:string , Senha:String}) {
  this.http.post(this.urlAutenticar, usuario).subscribe({

    next: (value:any) => {
      this.tokenService.saveToken(value.token)
      this.router.navigate(['/Gym']);
    },
    error: (err) => {
      console.log(err);
    }
  });
}

logout(){
  this.tokenService.removeToken();
  this.router.navigate(['/']);
}

}
