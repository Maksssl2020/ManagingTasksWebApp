import { Component, inject, input, OnInit, output } from '@angular/core';
import { IconsService } from '../../services/icons.service';
import { NgClass } from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../modules/Project';

@Component({
  selector: 'app-project-details-modal',
  standalone: true,
  imports: [NgClass],
  templateUrl: './project-details-modal.component.html',
  styleUrl: './project-details-modal.component.scss',
})
export class ProjectDetailsModalComponent implements OnInit {
  private iconService = inject(IconsService);
  private projectService = inject(ProjectService);
  closeModal = output<void>();
  cancelIcon = this.iconService.getIcon('cancel');
  chosenProjectTitle = input.required<string>();
  chosenProjectData: Project | undefined;

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
  }

  handleCloseModal() {
    this.closeModal.emit();
  }
}
