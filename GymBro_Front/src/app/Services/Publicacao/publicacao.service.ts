import { Injectable } from '@angular/core';
import { TokenService } from '../Token/token.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GymBroUrl } from 'src/app/API/url';
import { Publicacao } from 'src/app/Entities/Entities';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicacaoService {

  url = GymBroUrl + 'Publicacao/';

  constructor(private http : HttpClient ,private tokenService : TokenService , private router : Router) { }

  getAllPublicacao(pageSize : number , pageIndex : number){
    //Recupera token e garante o header com a autorização.
    const token = this.tokenService.getToken() ?? '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    //Define os parametros que são o tamanho da pagina e o indice.
    const params = new HttpParams().set('pageSize', pageSize.toString()).set('pageIndex', pageIndex.toString())
    //recupera as publicações daquele indice .
    return this.http.get<any[]>(this.url , {headers , params} );
  }
  
  getPublicacao(id : number) {
    const token = this.tokenService.getToken() ?? '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    //Recupera uma publicação especifica , com o  header de autorização com o token.
    return this.http.get<any>(this.url+id,{ headers });
  }

  getQtdPublicacao(){
    let qtdPublicacao = 0;
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    //Apenas recupera a qtd total de publicações
    return this.http.get(this.url + 'Total' , {headers} );
  }

  registrarPublicacao(publicacao : Publicacao) : void {
    const token = this.tokenService.getToken();
    if(token !== null){
      //Registra uma publicação nova,  caso suceda irá retornar para Gym
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.post(this.url , publicacao ,  {headers}).subscribe({
        next: (value) => {
          this.router.navigate(['/Gym']);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

}
