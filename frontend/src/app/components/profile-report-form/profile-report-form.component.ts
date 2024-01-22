import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Input } from '@angular/core';
@Component({
  selector: 'app-profile-report-form',
  templateUrl: './profile-report-form.component.html',
  styleUrls: ['./profile-report-form.component.css'],
})
export class ProfileReportFormComponent {
  @Input() user: any;
  constructor(private api: ApiService) {}
  messageTxt: string = '';
  submitReport() {
    this.api.submitProfileReport(this.user.username, this.messageTxt).subscribe(
      (next) => {
        alert('your report has been submitted for review');
      },
      (error) => {
        alert('Your report has failed to be submitted');
      },
      () => {
        this.messageTxt = '';
      },
    );
  }
}
