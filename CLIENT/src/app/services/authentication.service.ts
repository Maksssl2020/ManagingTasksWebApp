import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map } from 'rxjs';
import { User } from '../modules/User';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private http = inject(HttpClient);
  baseUrl = 'https://localhost:5179/api/';
  currentuser = signal<User | null>(null);

  register(model: any) {
    return this.http
      .post<User>(this.baseUrl.concat('authentication/register'), model)
      .pipe(
        map((user) => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.currentuser.set(user);
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
              this.currentuser.set(user);
          }
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentuser.set(null);
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
