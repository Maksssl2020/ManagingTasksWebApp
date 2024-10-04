import { Component, inject } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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

  handleAddNewNote() {}
}
