import { NgFor } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NoteService } from '../../services/note.service';
import { NoteCardComponent } from '../note-card/note-card.component';
import { Note } from '../../modules/Note';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [NgFor, NoteCardComponent],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss',
})
export class NoteListComponent implements OnInit {
  private noteService = inject(NoteService);
  firstColumnNotes: Note[] = [];
  secondColumnNotes: Note[] = [];
  thirdColumnNotes: Note[] = [];

  ngOnInit(): void {
    this.loadUserNotes();
  }

  loadUserNotes() {
    this.noteService.userNotes$.subscribe((notes) => {
      this.divideNotesIntoColumns(notes);
    });
    this.noteService.getUserNotes().subscribe({
      next: (notes) => {
        this.noteService.userNotesSubject.next(notes);
      },
    });
  }

  divideNotesIntoColumns(notes: Note[]) {
    this.firstColumnNotes = [];
    this.secondColumnNotes = [];
    this.thirdColumnNotes = [];

    for (let i = 0; i < notes.length; i++) {
      if (i % 3 === 0) {
        this.firstColumnNotes.push(notes[i]);
      } else if (i % 3 === 1) {
        this.secondColumnNotes.push(notes[i]);
      } else {
        this.thirdColumnNotes.push(notes[i]);
      }
    }
  }
}
