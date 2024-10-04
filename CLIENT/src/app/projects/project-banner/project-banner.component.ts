import { Component, inject, input, output } from '@angular/core';
import { IconsService } from '../../services/icons.service';
import { NgClass } from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { ProjectDetailsModalComponent } from '../project-details-modal/project-details-modal.component';
import { DeleteWarningModalComponent } from '../../delete-warning-modal/delete-warning-modal.component';
import { TaskService } from '../../services/task.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-banner',
  standalone: true,
  imports: [NgClass, ProjectDetailsModalComponent, DeleteWarningModalComponent],
  templateUrl: './project-banner.component.html',
  styleUrl: './project-banner.component.scss',
})
export class ProjectBannerComponent {
  private projectService = inject(ProjectService);
  private taskService = inject(TaskService);
  private iconService = inject(IconsService);
  private toastr = inject(ToastrService);
  currentChosenCategoryInSidebar = input.required<string>();
  deleteIcon = this.iconService.getIcon('delete');
  isDetailsModalOpen = false;
  isDeleteModalOpen = false;
  projectDeleted = output<void>();

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

  handleDeleteUserProject() {
    console.log('DELETING!');

    const tasksIds = this.taskService.getTasksIdsDependsOnProjectName(
      this.currentChosenCategoryInSidebar()
    );

    const projectId = this.projectService.getProjectIdByItsName(
      this.currentChosenCategoryInSidebar()
    );

    console.log(tasksIds);

    if (tasksIds.length > 0) {
      this.taskService.deleteUserTasks(tasksIds).subscribe({
        next: () => {
          this.toastr.success('Tasks related to project have been deleted!');
        },
      });
    }

    if (projectId) {
      this.projectService.deleteUserProject(projectId).subscribe({
        next: () => {
          this.toastr.success('Project has been deleted!');
          this.projectDeleted.emit();
        },
      });
    }
  }
}
