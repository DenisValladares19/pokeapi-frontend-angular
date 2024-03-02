import moment from 'moment';
import { ProfileState } from '../../interfaces/state/Profile.state';
import { createReducer, on } from '@ngrx/store';
import * as ProfileActions from '../actions/Profile.actions';

const initialState: ProfileState = {
  data: {
    birthDate: moment(),
    hobbies: [],
    name: '',
    document: '',
    minorityCard: '',
    image: '',
  },
  isComplete: false,
  pokemons: [],
};

export const ProfileReducer = createReducer(
  initialState,
  on(ProfileActions.setDataProfile, (state, action) => ({
    ...state,
    data: action.data,
  }))
);
