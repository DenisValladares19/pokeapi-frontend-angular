import { Component } from '@angular/core';
import { AvatarComponent } from '../../shared/avatar/avatar.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Observable } from 'rxjs';
import { Profile } from '../../interfaces/Profile';
import {
  selectIsComplete,
  selectProfileData,
} from '../../store/selectors/Profile.selector';
import { AsyncPipe } from '@angular/common';
import moment, { Moment } from 'moment';

@Component({
  selector: 'app-card-profile',
  standalone: true,
  imports: [AvatarComponent, AsyncPipe],
  templateUrl: './card-profile.component.html',
  styleUrl: './card-profile.component.scss',
})
export class CardProfileComponent {
  profile$: Observable<Profile>;
  isComplete$: Observable<boolean>;
  constructor(private store: Store<AppState>) {
    this.profile$ = this.store.select(selectProfileData);
    this.isComplete$ = this.store.select(selectIsComplete);
  }

  formatHobbies(hobbies?: string[]): string {
    if (!hobbies) return '';
    if (!Array.isArray(hobbies)) return '';

    return hobbies.join(', ');
  }

  getAge(birthDate?: Moment): string {
    if (!birthDate) return '';

    return moment().diff(birthDate, 'years').toString();
  }
}
