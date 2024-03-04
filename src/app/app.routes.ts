import { Routes } from '@angular/router';
import { CreateProfileComponent } from './pages/create-profile/create-profile.component';
import { SelectPokemonsComponent } from './pages/select-pokemons/select-pokemons.component';
import { HomeComponent } from './pages/home/home.component';
import { guardHomeGuard } from './guards/guard-home.guard';
import { guardPokemonsGuard } from './guards/guard-pokemons.guard';

export const routes: Routes = [
  { path: '', component: CreateProfileComponent },
  {
    path: 'pokemons',
    component: SelectPokemonsComponent,
    canActivate: [guardPokemonsGuard],
  },
  { path: 'home', component: HomeComponent, canActivate: [guardHomeGuard] },
];
