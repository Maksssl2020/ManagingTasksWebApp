import { Component, inject, OnInit, output, Signal } from '@angular/core';
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
  userProjects = this.projectService.userProjects();
  chosenCategory!: string;
  isActionModalOpen = false;
  currentCategory = output<string>();

  ngOnInit(): void {
    this.chosenCategory = 'all';
    this.currentCategory.emit(this.chosenCategory);
    this.loadUserProjects();
    console.log(this.userProjects);
  }

  loadUserProjects() {
    this.projectService.getUserProjects().subscribe({
      next: (projects) => {
        console.log(projects);
        this.userProjects = [...projects];
        this.projectService.userProjects.set(projects);
      },
    });
  }

  openModal() {
    this.isActionModalOpen = true;
  }

  closeModal() {
    this.isActionModalOpen = false;
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
}
