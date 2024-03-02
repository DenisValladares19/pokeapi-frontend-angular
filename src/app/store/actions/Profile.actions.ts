import { createAction, props } from '@ngrx/store';
import { ProfileActionEnum } from '../../interfaces/actions/Profile.action';
import { Profile } from '../../interfaces/Profile';

export const setDataProfile = createAction(
  ProfileActionEnum.SET_DATA_PROFILE,
  props<{ data: Profile }>()
);
