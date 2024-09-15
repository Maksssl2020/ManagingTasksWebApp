import { Component, inject, OnInit } from '@angular/core';
import { IconsService } from '../services/icons.service';
import { NgClass } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private iconsService = inject(IconsService);
  private authenticationService = inject(AuthenticationService);
  journalIcon: string | undefined;
  userIcon: string | undefined;
  logoutIcon: string | undefined;

  ngOnInit(): void {
    this.journalIcon = this.iconsService.getIcon('journal');
    this.userIcon = this.iconsService.getIcon('user');
    this.logoutIcon = this.iconsService.getIcon('logout');
  }

  logout() {
    this.authenticationService.logout();
  }
}
