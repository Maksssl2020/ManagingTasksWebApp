import { NgClass } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DeleteWarningModalComponent } from '../../delete-warning-modal/delete-warning-modal.component';
import { IconService } from '../../services/icon.service';
import { ProjectService } from '../../services/project.service';
import { TaskService } from '../../services/task.service';
import { ProjectDetailsModalComponent } from '../project-details-modal/project-details-modal.component';

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
  private iconService = inject(IconService);
  private toastr = inject(ToastrService);
  currentChosenCategoryInSidebar = input.required<string>();
  deleteIcon = this.iconService.getIcon('delete');
  isDetailsModalOpen = false;
  isDeleteModalOpen = false;
  projectDeleted = output<void>();

  toggleDetailsModal() {
    this.isDetailsModalOpen = !this.isDetailsModalOpen;
  }

  toggleDeleteModal() {
    this.isDeleteModalOpen = !this.isDeleteModalOpen;
  }

  handleDeleteUserProject() {
    console.log('DELETING!');
    const tasksIds = this.taskService.getTasksIdsDependsOnProjectName(
      this.currentChosenCategoryInSidebar()
    );

    const projectId = this.projectService.getProjectIdByItsName(
      this.currentChosenCategoryInSidebar()
    );

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
