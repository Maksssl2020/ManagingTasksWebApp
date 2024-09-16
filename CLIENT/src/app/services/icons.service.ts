import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IconsService {
  icons: { [key: string]: string } = {
    journal: 'bi bi-journal',
    user: 'bi bi-person',
    logout: 'bi bi-box-arrow-left',
    edit: 'bi bi-pencil-square',
    delete: 'bi bi-x-square',
    cancel: 'bi bi-x-lg',
  };

  constructor() {}

  getIcon(iconName: string): string | undefined {
    return this.icons[iconName];
  }
}
