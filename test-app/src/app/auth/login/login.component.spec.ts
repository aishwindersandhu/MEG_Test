import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthService } from '../auth.service';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    routerSpy = jasmine.createSpyObj('Router',['navigate']);
    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [provideHttpClient(),
      {provide: AuthService, useValue: authServiceSpy },
      { provide: Router, useValue: routerSpy  },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
  fit('should have invalid form when empty', () => {
    expect(component.loginForm.valid).toBeFalse();
  });
  fit('should have valid form when filled',()=>{
    component.loginForm.setValue({ username: 'user', password: 'pass' });
    expect(component.loginForm.valid).toBeTrue();
  })
  fit('should not call AuthService.login when form is invalid',()=>{
    component.loginForm.setValue({ username: '', password: '' });
    component.onSubmit();
    expect(authServiceSpy.login).not.toHaveBeenCalled();
  })
  fit('should login and navigate to dashboard if token is present', () => {
    const mockResponse = { token: 'Token abc123' };
    authServiceSpy.login.and.returnValue(of(mockResponse));
    component.loginForm.setValue({ username: 'user', password: 'pass' });
    component.onSubmit();
    expect(authServiceSpy.login).toHaveBeenCalledWith({ username: 'user', password: 'pass' });
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
  fit('should set errorMessage on login failure/invalid user', () => {
    authServiceSpy.login.and.returnValue(throwError(() => new Error('401 Unauthorized')));

    component.loginForm.setValue({ username: 'baduser', password: 'badpass' });
    component.onSubmit();
    expect(authServiceSpy.login).toHaveBeenCalled();
    expect(component.errorMessage).toBe('Invalid Credentials');
    expect(component.isDisabled).toBeTrue();
  });
});
