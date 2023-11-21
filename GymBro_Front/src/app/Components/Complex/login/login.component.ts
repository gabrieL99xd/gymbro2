import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/User/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  loginForm: FormGroup = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private userService : UserService) {

   }

  login(){
    const user = {
      Usuario: this.loginForm.get('login')!.value,
      Senha: this.loginForm.get('password')!.value
    };
    this.userService.autenticarUsuario(user);
  }
}
