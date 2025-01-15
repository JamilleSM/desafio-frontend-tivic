import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthUseCase } from '../../../core/usecases/auth/auth.usecase';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, AsyncPipe, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  authUseCase = inject(AuthUseCase);
  isLoggedIn$ = this.authUseCase.isLoggedIn$;
}