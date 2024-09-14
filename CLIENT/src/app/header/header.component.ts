import { Component, inject, OnInit } from '@angular/core';
import { IconsService } from '../services/icons.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgClass],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private iconsService = inject(IconsService);
  journalIcon: string | undefined;
  userIcon: string | undefined;

  ngOnInit(): void {
    this.journalIcon = this.iconsService.getIcon('journal');
    this.userIcon = this.iconsService.getIcon('user');
  }
}
