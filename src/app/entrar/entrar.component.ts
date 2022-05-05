import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})
export class EntrarComponent implements OnInit {

  userLogin: UserLogin = new UserLogin()

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  entrar() {
    this.auth.entrar(this.userLogin).subscribe({
      next: (resp: UserLogin) => {
        this.userLogin = resp;
        //alert('usuário logado com sucesso!');

      environment.token = this.userLogin.token
      environment.nome = this.userLogin.nome
      environment.foto = this.userLogin.foto
      environment.id = this.userLogin.id

      this.userLogin.foto

      this.router.navigate(['/inicio']);
    },
    error: (erro) => {
      if(erro.status == 401) {
        alert('usuário e/ou senha inválidos');
      }
     },
    });
  }

  validaEmail() {
    let regex = /.+\@.+\..+/
    
    if(this.userLogin.usuario.match(regex)) {
      let txtEmail = (<HTMLDivElement>document.querySelector('#txtEmail'))
      txtEmail.innerHTML = 'Email válido'
    } else {
      let txtEmail = (<HTMLDivElement>document.querySelector('#txtEmail'))
      txtEmail.innerHTML = 'Email inválido'
    }
  }

}
