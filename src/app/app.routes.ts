import { Routes } from '@angular/router';
import { CreateProfileComponent } from './pages/create-profile/create-profile.component';
import { SelectPokemonsComponent } from './pages/select-pokemons/select-pokemons.component';

export const routes: Routes = [
  { path: '', component: CreateProfileComponent },
  { path: 'pokemons', component: SelectPokemonsComponent },
];
