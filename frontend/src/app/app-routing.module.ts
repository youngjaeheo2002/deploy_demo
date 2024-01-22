import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PremiumSignupComponent } from './pages/premium-signup/premium-signup.component';
import { EventHomeComponent } from './pages/event-home/event-home.component';
import { EventInfoPageComponent } from './pages/event-info-page/event-info-page.component';
import { EventAddComponent } from './pages/event-add/event-add.component';
import { UsersearchComponent } from './pages/usersearch/usersearch.component';
import { StaffComponent } from './pages/staff/staff.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'premium-signup',
    component: PremiumSignupComponent,
  },
  {
    path: 'event-home',
    component: EventHomeComponent,
  },
  {
    path: 'event-info-page',
    component: EventInfoPageComponent,
  },
  {
    path: 'event-add',
    component: EventAddComponent,
  },
  {
    path: 'user-search',
    component: UsersearchComponent,
  },
  {
    path: 'staff',
    component: StaffComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
