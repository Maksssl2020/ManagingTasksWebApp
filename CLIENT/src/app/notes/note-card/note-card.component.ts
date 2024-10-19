import { NgClass } from '@angular/common';
import { Component, ElementRef, inject, input, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Note } from '../../modules/Note';
import { IconService } from '../../services/icon.service';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-note-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.scss',
})
export class NoteCardComponent {
  @ViewChild('noteContent') noteContent!: ElementRef<HTMLTextAreaElement>;
  private noteService = inject(NoteService);
  private iconService = inject(IconService);
  private toastr = inject(ToastrService);
  userNoteData = input.required<Note>();
  cancelIcon = this.iconService.getIcon('cancel');

  ngAfterViewInit(): void {
    this.adjustHeight(this.noteContent.nativeElement);
  }

  adjustHeight(textarea: HTMLTextAreaElement): void {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  handleNoteDelete() {
    this.noteService.deleteUserNote(this.userNoteData().id).subscribe({
      next: () => {
        this.toastr.success('Note has been deleted!');
      },
    });
  }
}
