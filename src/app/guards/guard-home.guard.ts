import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsComplete } from '../store/selectors/Profile.selector';
import { ObservableToPromise } from '../shared/Observable.utils';

export const guardHomeGuard: CanActivateFn = async (route, state) => {
  const store = inject(Store);
  const router = inject(Router);
  const isComplete = await ObservableToPromise(store.select(selectIsComplete));

  if (!isComplete) {
    router.navigateByUrl('/');
  }
  return isComplete;
};
