import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IconsService {
  icons: { [key: string]: string } = {
    journal: 'bi bi-journal',
    user: 'bi bi-person',
  };

  constructor() {}

  getIcon(iconName: string): string | undefined {
    return this.icons[iconName];
  }
}
