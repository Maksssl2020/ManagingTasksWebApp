import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.scss',
})
export class NoteFormComponent {
  private noteService = inject(NoteService);
  private toastr = inject(ToastrService);
  private formBuilder = inject(FormBuilder);

  noteForm = this.formBuilder.group({
    title: ['', Validators.required],
    details: ['', Validators.required],
  });

  handleAddNewNote() {
    if (this.noteForm.invalid) {
      return;
    }

    const noteData = {
      title: this.noteForm.value.title,
      details: this.noteForm.value.details,
    };

    this.noteService.saveUserNote(noteData).subscribe({
      next: () => {
        this.toastr.success('Added new note!');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
