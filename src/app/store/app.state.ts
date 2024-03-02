import { ActionReducerMap } from '@ngrx/store';
import { ProfileState } from '../interfaces/state/Profile.state';
import { ProfileReducer } from './reducers/Profile.reducer';

export interface AppState {
  profileState: ProfileState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  profileState: ProfileReducer,
};
