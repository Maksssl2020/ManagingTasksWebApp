import { Component, inject, input } from '@angular/core';
import { Note } from '../../modules/Note';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.scss',
})
export class NoteCardComponent {
  private noteService = inject(NoteService);
  userNoteData = input.required<Note>();
}
