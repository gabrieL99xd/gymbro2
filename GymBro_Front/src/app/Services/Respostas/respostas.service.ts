import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GymBroUrl } from 'src/app/API/url';
import { Resposta } from 'src/app/Entities/Entities';
import { TokenService } from '../Token/token.service';

@Injectable({
  providedIn: 'root'
})
export class RespostasService {

  url = GymBroUrl+'Resposta';

  constructor(private http : HttpClient , private tokenService : TokenService) { }

  saveResposta(idDaPublicacao : number, resposta : { idDoAutor:number , Descricao:string}){
    //Requisição para salvar uma resposta de tal publicação.
    const token = this.tokenService.getToken() ?? '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body =  resposta ;
    const urlReq = this.url+'/'+idDaPublicacao;
    return this.http.put<any>(urlReq , body , {headers});
  }
}
