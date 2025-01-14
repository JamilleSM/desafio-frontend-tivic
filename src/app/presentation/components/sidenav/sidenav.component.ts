import { Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { AuthUseCase } from '../../../core/usecases/auth/auth.usecase';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-sidenav',
  imports: [MatIconModule, AsyncPipe],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SideNavComponent {
  authUseCase = inject(AuthUseCase);
  isLoggedIn$ = this.authUseCase.isLoggedIn$;

  logout() {
    this.authUseCase.logout();
  }
}
