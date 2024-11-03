import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../modules/User';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;
  currentUserSubject = new BehaviorSubject<User | null>(null);

  currentUser(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  currentUserId(): number | undefined {
    return this.currentUserSubject.getValue()?.id;
  }

  register(model: any) {
    return this.http
      .post<User>(this.baseUrl.concat('authentication/register'), model)
      .pipe(
        map((user) => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
          return user;
        })
      );
  }

  login(model: any) {
    return this.http
      .post<User>(this.baseUrl.concat('authentication/login'), model)
      .pipe(
        map((user) => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user)),
              this.currentUserSubject.next(user);
          }
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  checkUsername(username: string) {
    return this.http
      .post<boolean>(this.baseUrl.concat('authentication/is-username-unique'), {
        username,
      })
      .pipe(map((isUnique) => (isUnique ? null : { noUnique: true })));
  }

  checkEmail(email: string) {
    return this.http
      .post<boolean>(this.baseUrl.concat('authentication/is-email-unique'), {
        email: email,
      })
      .pipe(map((isUnique) => (isUnique ? null : { noUnique: true })));
  }
}
