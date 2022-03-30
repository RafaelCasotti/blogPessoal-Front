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

  usuarioLogin: UserLogin = new UserLogin

  constructor(

    private auth: AuthService,

    private router: Router

  ) { }

  ngOnInit() {
  }

  entrar() {
    window.scroll(0, 0)
    this.auth.entrar(this.usuarioLogin).subscribe({
      next: (resp: UserLogin) => {
        this.usuarioLogin = resp
        environment.token = this.usuarioLogin.token
        environment.nome = this.usuarioLogin.nome
        environment.foto = this.usuarioLogin.foto
        environment.id = this.usuarioLogin.id
        this.router.navigate(['/inicio'])
      },
      error: erro => {
        if (erro.status == 401) {
          alert('Usuário ou senha estão incorretos!')
        }
      },
    });

  }
}
