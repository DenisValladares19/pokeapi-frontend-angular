import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { CardProfileComponent } from '../../components/card-profile/card-profile.component';
import { PokemonListHomeComponent } from '../../components/pokemon-list-home/pokemon-list-home.component';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../interfaces/Pokemon';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { selectPokemonSelected } from '../../store/selectors/Profile.selector';
import { ObservableToPromise } from '../../shared/Observable.utils';
import { LoadingFullScreenComponent } from '../../shared/loading-full-screen/loading-full-screen.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ButtonComponent,
    MatIconModule,
    CardProfileComponent,
    PokemonListHomeComponent,
    LoadingFullScreenComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  pokemons: Pokemon[] = [];
  loading: boolean = false;

  constructor(
    private pokemonService: PokemonService,
    private store: Store<AppState>
  ) {
    this.pokemonService.getAllPokemon();
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
}
