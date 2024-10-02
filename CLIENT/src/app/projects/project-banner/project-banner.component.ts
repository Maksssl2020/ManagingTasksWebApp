import { Component, inject, input } from '@angular/core';
import { IconsService } from '../../services/icons.service';
import { NgClass } from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { ProjectDetailsModalComponent } from '../project-details-modal/project-details-modal.component';
import { DeleteWarningModalComponent } from '../../delete-warning-modal/delete-warning-modal.component';

@Component({
  selector: 'app-project-banner',
  standalone: true,
  imports: [NgClass, ProjectDetailsModalComponent, DeleteWarningModalComponent],
  templateUrl: './project-banner.component.html',
  styleUrl: './project-banner.component.scss',
})
export class ProjectBannerComponent {
  private projectService = inject(ProjectService);
  private iconService = inject(IconsService);
  currentChosenCategoryInSidebar = input.required<string>();
  deleteIcon = this.iconService.getIcon('delete');
  isDetailsModalOpen = false;
  isDeleteModalOpen = false;

  handleOpenDetailsModal() {
    this.isDetailsModalOpen = true;
  }

  handleCloseDetailsModal() {
    this.isDetailsModalOpen = false;
  }

  handleOpenDeleteModal() {
    this.isDeleteModalOpen = true;
  }

  handleCloseDeleteModal() {
    this.isDeleteModalOpen = false;
  }
}
