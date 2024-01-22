import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
})
export class MessageListComponent implements OnChanges, OnInit {
  constructor(
    private api: ApiService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.api.getMe().subscribe(
      (next) => {
        this.myself = next;
      },
      (error) => {
        this.router.navigate(['/']);
      },
    );
  }
  @Input() messages: any[] = [];
  myself: any;
  @ViewChild('messageList') messageList!: ElementRef;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['messages'] && changes['messages'].currentValue) {
      const totalMessages = changes['messages'].currentValue['messages'].length;
      const lastTenMessages = changes['messages'].currentValue[
        'messages'
      ].slice(totalMessages - 10 >= 0 ? totalMessages - 10 : 0);
      this.messages = lastTenMessages;
    }
  }
}
