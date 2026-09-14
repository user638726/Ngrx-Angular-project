import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { authActions } from '../../store/action';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';
import { selectIsSubmitting, selectValidationErrors } from '../../store/reducers';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../../services/auth-service.service';
import { combineLatest } from 'rxjs';
import { BackendErrorMessages } from '../../../shared/components/backend-error-messages/backend-error-messages';

@Component({
  imports: [RouterLink,ReactiveFormsModule,AsyncPipe,BackendErrorMessages],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private store = inject(Store);
  form = this.fb.nonNullable.group({
    username:['',Validators.required],
    email:['',Validators.required],
    password:['',Validators.required],
  })

  data$ = combineLatest({
    isSubmitting:this.store.select(selectIsSubmitting),
    backendErrors:this.store.select(selectValidationErrors),
  })
  onSubmit(){
    console.log('form',this.form.getRawValue());
    const request:RegisterRequestInterface={
      user:this.form.getRawValue(),
    }
    this.store.dispatch(authActions.register({request}));
  }
}
