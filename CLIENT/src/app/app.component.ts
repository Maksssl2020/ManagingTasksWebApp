import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AuthenticationService } from './services/authentication.service';
import { filter } from 'rxjs';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HomeComponent, NgClass, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private authenticationService = inject(AuthenticationService);
  private router = inject(Router);
  isAuthPage = false;

  ngOnInit(): void {
    this.setCurrentUser();

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
    this.authenticationService.currentuser.set(user);
  }
}
