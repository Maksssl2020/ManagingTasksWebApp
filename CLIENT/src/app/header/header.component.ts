import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { IconService } from '../services/icon.service';
import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private iconService = inject(IconService);
  private authenticationService = inject(AuthenticationService);
  private sidebarService = inject(SidebarService);
  private router = inject(Router);
  journalIcon?: string;
  logoutIcon?: string;
  hamburgerIcon?: string;

  ngOnInit(): void {
    this.journalIcon = this.iconService.getIcon('journal');
    this.logoutIcon = this.iconService.getIcon('logout');
    this.hamburgerIcon = this.iconService.getIcon('hamburger');
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigateByUrl('/');
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  onLogoClick() {
    this.sidebarService.setActiveCategory('all');
  }
}
