import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, DashboardComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(APP_ROUTES),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
