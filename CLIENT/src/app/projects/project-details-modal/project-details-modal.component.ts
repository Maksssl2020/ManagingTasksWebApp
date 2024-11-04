import { NgClass } from '@angular/common';
import { Component, inject, input, OnInit, output } from '@angular/core';
import { openCloseModalAnimation } from '../../animations/animations';
import { Project } from '../../models/Project';
import { IconService } from '../../services/icon.service';
import { ProjectService } from '../../services/project.service';
import { AppModalComponent } from '../../modals/app-modal/app-modal.component';

@Component({
  selector: 'app-project-details-modal',
  standalone: true,
  imports: [NgClass, AppModalComponent],
  templateUrl: './project-details-modal.component.html',
  styleUrl: './project-details-modal.component.scss',
  animations: [openCloseModalAnimation],
})
export class ProjectDetailsModalComponent implements OnInit {
  private iconService = inject(IconService);
  private projectService = inject(ProjectService);
  closeModal = output<void>();
  cancelIcon = this.iconService.getIcon('cancel');
  chosenProjectTitle = input.required<string>();
  chosenProjectData: Project | undefined;
  isModalOpen: boolean = false;

  ngOnInit(): void {
    const filteredProjects = this.projectService
      .userProjects()
      .filter(
        (project) =>
          project.title.toLowerCase() ===
          this.chosenProjectTitle().toLowerCase()
      );

    this.chosenProjectData =
      filteredProjects.length > 0 ? filteredProjects[0] : undefined;

    if (this.chosenProjectData) {
      setTimeout(() => {
        this.isModalOpen = true;
      });
    }
  }

  handleCloseModal() {
    this.isModalOpen = false;

    setTimeout(() => {
      this.closeModal.emit();
    }, 300);
  }
}
