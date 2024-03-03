import { Component, OnInit } from '@angular/core';
import { LoadingFullScreenComponent } from '../../shared/loading-full-screen/loading-full-screen.component';
import { TitleComponent } from '../../shared/title/title.component';
import { CardProfileComponent } from '../../components/card-profile/card-profile.component';
import { PokemonListComponent } from '../../components/pokemon-list/pokemon-list.component';
import { PokemonInit } from '../../interfaces/Pokemon.init';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-select-pokemons',
  standalone: true,
  imports: [
    LoadingFullScreenComponent,
    TitleComponent,
    CardProfileComponent,
    PokemonListComponent,
  ],
  templateUrl: './select-pokemons.component.html',
  styleUrl: './select-pokemons.component.scss',
})
export class SelectPokemonsComponent implements OnInit {
  pokemons: PokemonInit[] = [];
  loading: boolean = false;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loading = true;
    this.pokemonService.getAllPokemon().subscribe({
      next: (result) => {
        this.pokemons = result.results;
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      },
      error: (error) => {
        console.log('[error load pokemon]', error);
        this.loading = false;
      },
    });
  }
}
