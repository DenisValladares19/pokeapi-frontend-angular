import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectProfileFeature = (state: AppState) => state.profileState;

export const selectProfileData = createSelector(
  selectProfileFeature,
  (state) => state.data
);
