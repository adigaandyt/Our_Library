import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private url = 'http://localhost:8000';
  private users$: Subject<User[]> = new Subject();

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
}
