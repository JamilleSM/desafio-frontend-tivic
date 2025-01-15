import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { ToastrService } from "ngx-toastr";
import { Usuario } from "../../../core/entities/usuario.entity";
import { UsuarioRepositoryImpl } from "../../../data/repositories/usuario-impl.repository";
import { Router } from "@angular/router";
import { AuthUseCase } from "../../../core/usecases/auth/auth.usecase";

@Component({
  selector: 'app-login',
  imports: [MatIconModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  usuario: Usuario[] = [];
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required]),
  });

  usuarioRepository = inject(UsuarioRepositoryImpl);
  toast = inject(ToastrService);
  router = inject(Router);
  authUseCase = inject(AuthUseCase);

  async login(): Promise<void> {
    if (this.loginForm.invalid) {
      this.toast.warning('Preencha os campos corretamente!');
      return;
    }

    const email = this.loginForm.get('email')?.value;
    const senha = this.loginForm.get('senha')?.value;

    const success = await this.authUseCase.login(email, senha);

    if (success) {
      this.authUseCase.toast.success('Login realizado com sucesso!');
      this.router.navigate(['/relatorio']);
    }
  }

  loginSemConta() {
    this.router.navigate(['/relatorio']);
  }
}