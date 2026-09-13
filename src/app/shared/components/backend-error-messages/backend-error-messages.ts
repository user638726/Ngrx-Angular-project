import { Component, computed, input, OnInit } from '@angular/core';
import { BackendErrorsInterface } from '../../types/backendErrors.interface';

@Component({
  imports: [],
  selector: 'app-backend-error-messages',
  styleUrl: './backend-error-messages.css',
  templateUrl: './backend-error-messages.html',
})
export class BackendErrorMessages {
   backendErrors = input<BackendErrorsInterface>({});
   errorMessages = computed(() => {
    const errors = this.backendErrors();

    return Object.keys(errors).map((name) => {
      const messages = errors[name].join(' ');

      return `${name} ${messages}`;
    });
  });

}
