import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-profilecard',
  templateUrl: './profilecard.component.html',
  styleUrls: ['./profilecard.component.css'],
})
export class ProfilecardComponent {
  @Input() user!: User;

  constructor(private router: Router) {}
}
