import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginformComponent } from './components/loginform/loginform.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './pages/profile/profile.component';
import { PremiumSignupComponent } from './pages/premium-signup/premium-signup.component';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { EventHomeComponent } from './pages/event-home/event-home.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { LargeEventCardComponent } from './components/large-event-card/large-event-card.component';
import { EventInfoPageComponent } from './pages/event-info-page/event-info-page.component';
import { EventAddComponent } from './pages/event-add/event-add.component';
import { EventAddFormComponent } from './components/event-add-form/event-add-form.component';
import { EventInfoComponent } from './components/event-info/event-info.component';
import { ApiService } from './services/api.service';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { UsersearchComponent } from './pages/usersearch/usersearch.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ProfilecardComponent } from './components/profilecard/profilecard.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ReportFormComponent } from './components/message-list/report-form/report-form.component';
import { ProfileReportFormComponent } from './components/profile-report-form/profile-report-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EventFilterFormComponent } from './components/event-filter-form/event-filter-form.component';
import { StaffComponent } from './pages/staff/staff.component';
import { ReportedUserCardComponent } from './components/reported-user-card/reported-user-card.component';
import { BannedUserCardComponent } from './components/banned-user-card/banned-user-card.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    LoginformComponent,
    SignupFormComponent,
    ProfileComponent,
    PremiumSignupComponent,
    PaymentFormComponent,
    EventHomeComponent,
    EventCardComponent,
    LargeEventCardComponent,
    EventInfoPageComponent,
    EventAddComponent,
    EventAddFormComponent,
    EventInfoComponent,
    UsersearchComponent,
    LoadingSpinnerComponent,
    ProfilecardComponent,
    ChatRoomComponent,
    MessageListComponent,
    ReportFormComponent,
    ProfileReportFormComponent,
    EventFilterFormComponent,
    StaffComponent,
    ReportedUserCardComponent,
    BannedUserCardComponent,
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    FontAwesomeModule,
  ],
  providers: [
    ApiService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
