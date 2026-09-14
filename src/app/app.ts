import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBar } from './shared/components/top-bar/top-bar';
import { Store } from '@ngrx/store';
import { authActions } from './auth/store/action';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,TopBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  private store=inject(Store);
  ngOnInit(): void {
    this.store.dispatch(authActions.getCurrentUser())
  }

}
