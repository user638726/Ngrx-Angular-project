import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { select, Store } from '@ngrx/store';
import { selectCurrentUser } from '../../../auth/store/reducers';
import { combineLatest, filter, Subscription } from 'rxjs';
import { selectIsSubmitting, selectValidationErrors } from '../../store/reducers';
import { AsyncPipe } from '@angular/common';
import { BackendErrorMessages } from '../../../shared/components/backend-error-messages/backend-error-messages';
import { CurrentUserRequestInterface } from '../../../shared/types/currentUserRequest.interface';
import { authActions } from '../../../auth/store/action';

@Component({
  imports: [ReactiveFormsModule, AsyncPipe, BackendErrorMessages],
  selector: 'app-settings',
  styleUrl: './settings.css',
  templateUrl: './settings.html',
})
export class Settings implements OnInit,OnDestroy{
  private fb=inject(FormBuilder);
  private store = inject(Store);
  form = this.fb.nonNullable.group({
    image:'',
    username:'',
    bio:'',
    email:'',
    password:'',
  })
  currentUser = signal<CurrentUserInterface | undefined>(undefined);
  currentUserSubscription?:Subscription;
     data$ = combineLatest({
    isSubmitting:this.store.select(selectIsSubmitting),
    backendErrors:this.store.select(selectValidationErrors),
   })
  ngOnInit(): void {
     this.currentUserSubscription=(this.store.pipe(select(selectCurrentUser),filter(Boolean)).subscribe((currentUser)=>{
      this.currentUser.set(currentUser)
      this.initializeForm()
     }))
  }
  ngOnDestroy(): void {
     this.currentUserSubscription?.unsubscribe();
  }
   initializeForm(){
    if(!this.currentUser()){
      throw new Error('current user is not set')
    }
    this.form.patchValue({
      image:this.currentUser()?.image ?? '',
      username:this.currentUser()?.username,
      bio:this.currentUser()?.bio ??'',
      email:this.currentUser()?.email,
      password:'',
    })
   }
   submit():void{
   const currentUser = this.currentUser();

  if (!currentUser) {
    throw new Error('current user is not set');
  }

  const currentUserRequest: CurrentUserRequestInterface = {
    user: {
      ...currentUser,
      ...this.form.getRawValue(),
    },
  };
    this.store.dispatch(authActions.updateCurrentUser({currentUserRequest}))
   }
   logout(){
    this.store.dispatch(authActions.logout())
   }
}
