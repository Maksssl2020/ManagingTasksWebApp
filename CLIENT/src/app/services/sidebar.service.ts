import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Sidebar } from '../models/Sidebar';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private sidebarState = new BehaviorSubject<Sidebar | null>({
    state: false,
    activeCategory: 'all',
  });
  sidebarState$ = this.sidebarState.asObservable();

  toggleSidebar() {
    const currentSidebarState = this.sidebarState.getValue();

    setTimeout(() => {
      if (currentSidebarState) {
        this.sidebarState.next({
          ...currentSidebarState,
          state: !currentSidebarState?.state,
        });
      }
    });
  }

  setActiveCategory(category: string) {
    const currentState = this.sidebarState.getValue();
    if (currentState) {
      this.sidebarState.next({
        ...currentState,
        activeCategory: category,
      });
    }
  }
}
