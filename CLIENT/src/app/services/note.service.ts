import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';
import { Note } from '../modules/Note';
import { of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private http = inject(HttpClient);
  private authenticationService = inject(AuthenticationService);
  baseUrl = environment.apiUrl;
  userNotes = signal<Note[]>([]);

  getUserNotes() {
    return this.http
      .get<Note[]>(
        this.baseUrl.concat(
          `user-notes/get-user-notes/${
            this.authenticationService.currentUser()?.id
          }`
        )
      )
      .pipe(
        tap({
          next: (n) => this.userNotes.set(n),
        })
      );
  }

  saveUserNote(model: any) {
    const savedNotes = this.http
      .post<Note>(
        this.baseUrl.concat(
          `user-notes/add-note/${this.authenticationService.currentUser()?.id}`
        ),
        model
      )
      .subscribe({
        next: (note) =>
          this.userNotes.update((currentNotes) => [...currentNotes, note]),
      });

    return of(savedNotes);
  }

  deleteUserNote(noteId: number) {
    this.http
      .delete<HttpStatusCode>(
        this.baseUrl.concat(`user-notes/delete-note/${noteId}`)
      )
      .pipe(
        tap({
          next: () =>
            this.userNotes.update((notes) => {
              return notes.filter((note) => note.id !== noteId);
            }),
        })
      );
  }
}
