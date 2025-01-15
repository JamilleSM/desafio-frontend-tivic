import { Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { AuthUseCase } from '../../../core/usecases/auth/auth.usecase';
import { AsyncPipe } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  imports: [MatIconModule, AsyncPipe, RouterLink],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SideNavComponent {
  authUseCase = inject(AuthUseCase);
  isLoggedIn$ = this.authUseCase.isLoggedIn$;
  path: string;
  
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.path = event.urlAfterRedirects;
      });
  }

  logout() {
    this.authUseCase.logout();
  }
}
