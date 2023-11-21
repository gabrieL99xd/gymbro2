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
    const token = this.tokenService.getToken() ?? '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const body =  anotacao ;
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
    const urlReq = this.url + '/' + id;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(urlReq , {headers});
  }

}
