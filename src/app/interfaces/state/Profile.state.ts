import { PokemonInit } from '../Pokemon.init';
import { Profile } from '../Profile';

export interface ProfileState {
  data: Profile;
  isComplete: boolean;
  pokemons: PokemonInit[];
}
