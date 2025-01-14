import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { UsuarioRepositoryImpl } from '../../../data/repositories/usuario-impl.repository';
import { Usuario } from '../../../domain/models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthUseCase {
  loggedIn = new BehaviorSubject<boolean>((this.getLoggedInStatus()));
  isLoggedIn$ = this.loggedIn.asObservable();

  usuarioRepository = inject(UsuarioRepositoryImpl);
  router = inject(Router);
  toast = inject(ToastrService);

  async login(email: string, senha: string): Promise<boolean> {
    try {
      const usuarios: Usuario[] = await this.usuarioRepository.getUsuario();
      const usuarioEncontrado = usuarios.find(
        (user) => user.email === email && user.senha === senha
      );

      if (usuarioEncontrado) {
        this.loggedIn.next(true);
        localStorage.setItem('isLoggedIn', 'true');
        return true;
      } else {
        this.toast.error('Email ou senha inválido. Tente novamente.');
        return false;
      }
    } catch {
      this.toast.error('Erro ao realizar login. Tente novamente mais tarde.');
      return false;
    }
  }

  loginSemConta(): void {
    this.loggedIn.next(true);
  }

  logout(): void {
    this.loggedIn.next(false);
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

  private getLoggedInStatus(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}
