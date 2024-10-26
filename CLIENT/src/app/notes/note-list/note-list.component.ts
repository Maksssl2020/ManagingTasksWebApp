import { NgFor, NgIf } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Note } from '../../modules/Note';
import { NoteService } from '../../services/note.service';
import { NoteCardComponent } from '../note-card/note-card.component';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [NgFor, NoteCardComponent, NgIf],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss',
})
export class NoteListComponent implements OnInit {
  private noteService = inject(NoteService);
  firstColumnNotes: Note[] = [];
  secondColumnNotes: Note[] = [];
  thirdColumnNotes: Note[] = [];
  amountOfColumns: number = 3;
  isAmountOfColumnsChange: boolean = false;
  allNotes: Note[] = [];

  ngOnInit(): void {
    this.onWindowResize();
    this.loadUserNotes();
  }

  loadUserNotes() {
    this.noteService.userNotes$.subscribe((notes) => {
      this.divideNotesIntoColumns(notes);
      this.allNotes = notes;
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
      if (i % 3 === 0 && this.amountOfColumns === 3) {
        this.firstColumnNotes.push(notes[i]);
      } else if (
        (i % 3 === 1 && this.amountOfColumns === 3) ||
        (i % 2 === 0 && this.amountOfColumns === 2)
      ) {
        this.secondColumnNotes.push(notes[i]);
      } else {
        this.thirdColumnNotes.push(notes[i]);
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    const windowWidth = innerWidth;

    if (windowWidth <= 1280 && this.amountOfColumns !== 2) {
      this.isAmountOfColumnsChange = true;
      this.amountOfColumns = 2;
    } else if (windowWidth > 1280 && this.amountOfColumns !== 3) {
      this.isAmountOfColumnsChange = true;
      this.amountOfColumns = 3;
    } else if (windowWidth < 576 && this.amountOfColumns !== 1) {
      this.isAmountOfColumnsChange = true;
      this.amountOfColumns = 1;
    }

    if (this.isAmountOfColumnsChange) {
      this.noteService.userNotes$.subscribe((notes) => {
        this.divideNotesIntoColumns(notes);
      });

      this.isAmountOfColumnsChange = false;
    }
  }
}
