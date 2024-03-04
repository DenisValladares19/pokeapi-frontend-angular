import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ObservableToPromise } from '../shared/Observable.utils';
import { selectProfileData } from '../store/selectors/Profile.selector';

export const guardPokemonsGuard: CanActivateFn = async (route, state) => {
  const store = inject(Store);
  const router = inject(Router);
  const profile = await ObservableToPromise(store.select(selectProfileData));

  if (!profile.name || profile.name === '') {
    router.navigateByUrl('/');
    return false;
  }
  return true;
};
