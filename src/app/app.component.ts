import { Component, Inject, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SideNavComponent } from './presentation/components/sidenav/sidenav.component';
import { filter } from 'rxjs';
import { HeaderComponent } from './presentation/components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideNavComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  path: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.path = event.urlAfterRedirects;
      });
  }
}
