import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducer } from './auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { MatchingPasswordDirective, RegisterComponent } from './register/register.component';
import { LoginGuard } from './login.guard';
import { UserEditComponent } from './user-settings/user-settings.component';
import { UserSettingsFormComponent } from './user-settings/user-settings-form/user-settings-form.component';
import { TelegramService } from './telegram.service';

export const authRoutes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user', component: UserEditComponent, canActivate: [LoginGuard]}
];

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', reducer),
    EffectsModule.forFeature([AuthEffects]),
    HttpClientModule,
    RouterModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatCheckboxModule
  ],
  providers: [
    LoginGuard,
    TelegramService
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    MatchingPasswordDirective,
    UserEditComponent,
    UserSettingsFormComponent
  ]
})
export class AuthModule {
}
