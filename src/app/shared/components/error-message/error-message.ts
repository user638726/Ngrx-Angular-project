import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-error-message',
  styleUrl: './error-message.css',
  templateUrl: './error-message.html',
})
export class ErrorMessage {
  message = input<string>('Something went wrong');


}
