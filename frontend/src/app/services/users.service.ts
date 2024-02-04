import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private url = 'http://ourlib.ddns.net:80';
  private users$: Subject<User[]> = new Subject();
  authToken: any;
  myUser: any;
  isAdmin: boolean = true;

  constructor(private httpClient: HttpClient) {}

  private refreshEmployees() {
    this.httpClient.get<User[]>(`${this.url}/api/users`).subscribe((users) => {
      this.users$.next(users);
    });
  }

  createUser(user: User): Observable<string> {
    return this.httpClient.post(`${this.url}/api/users/register`, user, {
      responseType: 'text',
    });
  }

  storeUserData(data: any) {
    localStorage.setItem('id_token', data.token);
    localStorage.setItem('name', data.name);
    localStorage.setItem('isAdmin', data.isAdmin);
    this.authToken = data.token;
    this.myUser = data.name;
    this.isAdmin = data.isAdmin;
  }

  logoutUser() {
    this.authToken = null;
    this.myUser = null;
    this.isAdmin = false;
    localStorage.clear();
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
}
