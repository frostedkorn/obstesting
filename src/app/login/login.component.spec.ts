import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Observable, of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

class AuthServiceMock {
  login(): Observable<any> {
    return of({
      status: true,
      token: 'faketoken',
    });
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let service: AuthService;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  let routerMock = createSpyObj('Router', ['navigateByUrl']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: AuthService,
          useClass: AuthServiceMock,
        },
        {
          provide: Router,
          useValue: routerMock,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('#onFormSubmit', () => {
    beforeEach(() => {
      component.loginForm.setValue({
        username: 'test',
        password: 'testpass',
      });
    });

    it('should call login method', () => {
      spyOn(service, 'login').and.returnValue(
        of({ status: true, token: 'faketoken' })
      );
      component.onFormSubmit();

      expect(service.login).toHaveBeenCalledWith(component.loginForm.value);
    });

    it('should set token after logging in', fakeAsync(() => {
      component.onFormSubmit();

      tick();
      fixture.detectChanges();

      expect(component.token).toBe('faketoken');
      expect(router.navigateByUrl).toHaveBeenCalledWith('dashboard');
    }));
  });
});
