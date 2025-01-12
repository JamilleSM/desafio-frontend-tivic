import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavComponent } from './presentation/components/sidenav/sidenav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
