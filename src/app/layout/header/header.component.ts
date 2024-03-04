import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Profile } from '../../interfaces/Profile';
import {
  selectIsComplete,
  selectProfileData,
} from '../../store/selectors/Profile.selector';
import { formatProfileName } from '../../shared/String.utils';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent, MatIconModule, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isComplete$: Observable<boolean>;
  profile$: Observable<Profile>;

  constructor(private store: Store<AppState>) {
    this.isComplete$ = this.store.select(selectIsComplete);
    this.profile$ = this.store.select(selectProfileData);
  }

  formatName(name?: string) {
    return formatProfileName(name);
  }
}
