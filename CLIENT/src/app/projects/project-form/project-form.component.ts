import { Component, inject } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NgClass],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss',
})
export class ProjectFormComponent {
  private projectService = inject(ProjectService);
  private authenticationService = inject(AuthenticationService);
  private toastr = inject(ToastrService);

  projectForm = new FormGroup({
    title: new FormControl('', { validators: Validators.required }),
    details: new FormControl('', { validators: Validators.required }),
  });

  handleAddProject() {
    if (this.projectForm.invalid) {
      return;
    }

    const projectData = {
      title: this.projectForm.value.title,
      details: this.projectForm.value.details,
      userId: this.authenticationService.currentUser()?.id,
    };

    this.projectService.saveUserProject(projectData).subscribe({
      next: () => {
        this.toastr.success('New project added successfully!');
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Something went wrong!');
      },
    });
  }
}
