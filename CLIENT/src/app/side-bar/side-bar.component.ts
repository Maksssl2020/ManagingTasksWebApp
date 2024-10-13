import {
  AfterViewInit,
  Component,
  inject,
  input,
  OnInit,
  output,
  Signal,
  ViewChild,
} from '@angular/core';
import { ActionModalComponent } from '../action-modal/action-modal.component';
import { NgClass } from '@angular/common';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [ActionModalComponent, NgClass],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent implements OnInit {
  private projectService = inject(ProjectService);
  userProjects = this.projectService.userProjects;
  chosenCategory!: string;
  isActionModalOpen = false;
  currentCategory = output<string>();

  ngOnInit(): void {
    this.loadUserProjects();
    this.chosenCategory = 'all';
    this.currentCategory.emit(this.chosenCategory);
  }

  loadUserProjects() {
    this.projectService.getUserProjects().subscribe({
      next: (projects) => this.projectService.userProjects.set(projects),
    });
  }

  toggleModal() {
    this.isActionModalOpen = !this.isActionModalOpen;
  }

  setChosenCategory(category: string) {
    this.chosenCategory = category;
    this.currentCategory.emit(this.chosenCategory);
  }

  isCategoryChosen(category: string): boolean {
    return category === this.chosenCategory;
  }

  handleDataAdded() {
    this.isActionModalOpen = false;
  }

  handleProjectDeleted() {
    this.setChosenCategory('home');
  }
}
