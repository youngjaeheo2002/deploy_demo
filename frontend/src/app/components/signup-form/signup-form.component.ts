import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent {
  userForm: any;
  usernameTaken: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      username: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)],
      ],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      type: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
          ),
        ],
      ],
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }
    this.usernameTaken = false;
    const values = this.userForm.value;
    this.api
      .signUp(
        values.firstName,
        values.lastName,
        values.type,
        values.password,
        values.username,
      )
      .subscribe(
        (next) => {
          this.router.navigate(['/login']);
        },
        (error) => {
          if (error.error.error) {
            if (error.error.error === 'Username already taken') {
              this.usernameTaken = true;
            }
          }
        },
      );

    // Handle form submission here
  }
}
