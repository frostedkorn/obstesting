import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface UserCreds {
  username: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor() {}

  login(creds: UserCreds): Observable<any> {
    if (!creds.username || !creds.password)
      return of({
        status: false,
        token: null,
      });

    return of({
      status: true,
      token: 'faketoken',
    });
  }
}
