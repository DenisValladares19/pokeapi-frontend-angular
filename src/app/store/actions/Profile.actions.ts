import { createAction, props } from '@ngrx/store';
import { ProfileActionEnum } from '../../interfaces/actions/Profile.action';
import { Profile } from '../../interfaces/Profile';
import { PokemonInit } from '../../interfaces/Pokemon.init';

export const setDataProfile = createAction(
  ProfileActionEnum.SET_DATA_PROFILE,
  props<{ data: Profile }>()
);

export const setPokemonSelected = createAction(
  ProfileActionEnum.SET_POKEMON_SELECTED,
  props<{ data: PokemonInit[] }>()
);
