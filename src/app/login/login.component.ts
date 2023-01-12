import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  token!: string;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onFormSubmit() {
    if (this.loginForm.invalid) return;

    this.auth.login(this.loginForm.value).subscribe((res: any) => {
      this.token = res.token;

      void this.router.navigateByUrl('dashboard');
    });
  }
}
