import { Component, inject, OnInit } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss',
})
export class NoteListComponent implements OnInit {
  private noteService = inject(NoteService);
  userNotes = this.noteService.userNotes;

  ngOnInit(): void {
    this.loadUserNotes();
  }

  loadUserNotes() {
    this.noteService.getUserNotes().subscribe({
      next: (notes) => this.noteService.userNotes.set(notes),
    });
  }
}
