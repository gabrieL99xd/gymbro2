import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GymBroUrl } from 'src/app/API/url';
import { TokenService } from '../Token/token.service';
import { Anotacao } from 'src/app/Entities/Entities';
import { Router } from '@angular/router';
import { UserService } from '../User/user.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AnotacaoService {

  url = GymBroUrl+'Anotacoes';
  
  constructor(private http : HttpClient , private tokenService : TokenService , private route : Router) { }

  saveAnotacao(anotacao : Anotacao){
    //recupera o token
    const token = this.tokenService.getToken() ?? '';
    // define as autorizações da requisição com o token.
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    //define o body
    const body =  anotacao ;
    //faz requisição , em caso de sucesso redirecionar para a url Anotacoes
    this.http.post(this.url, body ,{headers}).subscribe({
      next:(value) =>{
        this.route.navigate(['/Anotacoes']);
      },
      error:(err)=> {
        console.log(err);
      }
    });
  }

  getAllAnotacoes(){
    const token = this.tokenService.getToken() ?? '';
    const decoded = jwtDecode(token) as any;
    const id = decoded.Id;
    //decodifica o token e recupera o Id do usuario.
    const urlReq = this.url + '/' + id;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    //Recupera as anotacoes daquele usuario.
    return this.http.get(urlReq , {headers});
  }

}
