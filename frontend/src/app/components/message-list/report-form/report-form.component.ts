import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css'],
})
export class ReportFormComponent {
  constructor(private api: ApiService) {}
  @Input() message: any;
  messageTxt: string = '';

  submitReport() {
    if (this.messageTxt === '') {
      return;
    }
    this.api
      .submitChatReport(
        this.message.senderName,
        this.messageTxt,
        this.message.message,
      )
      .subscribe(
        (next) => {
          alert('your report was submitted');
        },
        (error) => {
          alert('Your report was failed to be submitted');
        },
        () => {
          this.messageTxt = '';
        },
      );
  }
}
