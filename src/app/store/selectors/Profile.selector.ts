import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectProfileFeature = (state: AppState) => state.profileState;

export const selectProfileData = createSelector(
  selectProfileFeature,
  (state) => state.data
);

export const selectPokemonSelected = createSelector(
  selectProfileFeature,
  (state) => state.pokemons
);

export const selectIsComplete = createSelector(
  selectProfileFeature,
  (state) => state.isComplete
);
