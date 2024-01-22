import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css'],
})
export class PaymentFormComponent implements OnInit {
  paymentForm: any;

  constructor(
    private formBuilder: FormBuilder,
    public api: ApiService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.paymentForm = this.formBuilder.group({
      cardName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      cardExpiry: ['', Validators.required],
      cardCvc: ['', Validators.required],
    });
  }

  processPayment(): void {
    if (this.paymentForm.valid) {
      // Process payment logic
      this.api.switchToPremium().subscribe(
        (next) => {
          this.api.type = 'Premium';
          this.router.navigate(['/profile']);
        },
        (error) => {
          console.log(error);
        },
      );
    }
  }
}
