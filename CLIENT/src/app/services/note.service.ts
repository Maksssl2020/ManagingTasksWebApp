import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';
import { Note } from '../modules/Note';
import { BehaviorSubject, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private http = inject(HttpClient);
  private authenticationService = inject(AuthenticationService);
  userNotesSubject = new BehaviorSubject<Note[]>([]);
  baseUrl = environment.apiUrl;
  userNotes$ = this.userNotesSubject.asObservable();

  getUserNotes() {
    return this.http.get<Note[]>(
      this.baseUrl.concat(
        `user-notes/get-user-notes/${
          this.authenticationService.currentUser()?.id
        }`
      )
    );
  }

  saveUserNote(model: any) {
    console.log(model);

    const savedNotes = this.http
      .post<Note>(
        this.baseUrl.concat(
          `user-notes/add-note/${this.authenticationService.currentUser()?.id}`
        ),
        model
      )
      .subscribe({
        next: (note) => {
          const currentNotes = this.userNotesSubject.getValue();
          this.userNotesSubject.next([...currentNotes, note]);
        },
      });

    return of(savedNotes);
  }

  deleteUserNote(noteId: number) {
    const currentNotes = this.userNotesSubject.getValue();
    const updatedNotes = currentNotes.filter((note) => note.id !== noteId);
    this.userNotesSubject.next(updatedNotes);

    return this.http.delete<HttpStatusCode>(
      this.baseUrl.concat(`user-notes/delete-note/${noteId}`)
    );
  }
}
