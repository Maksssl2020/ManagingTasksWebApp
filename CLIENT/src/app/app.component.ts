import { NgClass, NgIf } from '@angular/common';
import {
  Component,
  inject,
  OnInit
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, interval } from 'rxjs';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HomeComponent, NgClass, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private authenticationService = inject(AuthenticationService);
  private router = inject(Router);
  isAuthPage = false;

  ngOnInit(): void {
    this.setCurrentUser();

    interval(1000).subscribe();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isAuthPage =
          this.router.url.includes('sign-in') ||
          this.router.url.includes('sign-up');
      });
  }

  setCurrentUser() {
    const userData = localStorage.getItem('user');
    if (!userData) return;

    const user = JSON.parse(userData);
    this.authenticationService.currentUserSubject.next(user);
  }
}
