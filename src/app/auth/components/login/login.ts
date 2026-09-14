import { Component, inject } from '@angular/core';
import { BackendErrorMessages } from '../../../shared/components/backend-error-messages/backend-error-messages';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';
import { authActions } from '../../store/action';
import { selectIsSubmitting, selectValidationErrors } from '../../store/reducers';
import { combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth-service.service';
import { LoginRequestInterface } from '../../types/loginRequest.interface';

@Component({
  imports: [RouterLink,ReactiveFormsModule,CommonModule,BackendErrorMessages],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private store = inject(Store);
  form = this.fb.nonNullable.group({
    email:['',Validators.required],
    password:['',Validators.required],
  })

  data$ = combineLatest({
    isSubmitting:this.store.select(selectIsSubmitting),
    backendErrors:this.store.select(selectValidationErrors),
  })
  onSubmit(){
    console.log('form',this.form.getRawValue());
    const request:LoginRequestInterface={
      user:this.form.getRawValue(),
    }
    this.store.dispatch(authActions.login({request}));
  }
}
