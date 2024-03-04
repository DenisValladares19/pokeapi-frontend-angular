import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { CardProfileComponent } from '../../components/card-profile/card-profile.component';
import { PokemonListHomeComponent } from '../../components/pokemon-list-home/pokemon-list-home.component';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../interfaces/Pokemon';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import {
  selectPokemonSelected,
  selectProfileData,
} from '../../store/selectors/Profile.selector';
import { ObservableToPromise } from '../../shared/Observable.utils';
import { LoadingFullScreenComponent } from '../../shared/loading-full-screen/loading-full-screen.component';
import { Observable } from 'rxjs';
import { Profile } from '../../interfaces/Profile';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { formatProfileName } from '../../shared/String.utils';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ButtonComponent,
    MatIconModule,
    CardProfileComponent,
    PokemonListHomeComponent,
    LoadingFullScreenComponent,
    AsyncPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  pokemons: Pokemon[] = [];
  profile$: Observable<Profile>;
  loading: boolean = false;

  constructor(
    private pokemonService: PokemonService,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.pokemonService.getAllPokemon();
    this.profile$ = this.store.select(selectProfileData);
  }

  async ngOnInit() {
    this.loading = true;
    const result = await ObservableToPromise(
      this.store.select(selectPokemonSelected)
    );

    if (!result || result.length === 0) {
      this.loading = false;
      return;
    }

    const pokemonList = await Promise.all(
      result.map((pokemon) => this.pokemonService.getPokemonByUrl(pokemon.url))
    );

    this.pokemons = pokemonList;
    setTimeout(() => {
      this.loading = false;
    }, 100);
  }

  formatName(name?: string) {
    return formatProfileName(name);
  }

  goEditProfile() {
    this.router.navigateByUrl('/');
  }
}
