import { Component, Input } from '@angular/core';
import { CardPokemonPreviewComponent } from '../card-pokemon-preview/card-pokemon-preview.component';
import { PokemonInit } from '../../interfaces/Pokemon.init';
import { ButtonComponent } from '../../shared/button/button.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { setPokemonSelected } from '../../store/actions/Profile.actions';
import { InputSearchComponent } from '../../shared/input-search/input-search.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [
    CardPokemonPreviewComponent,
    ButtonComponent,
    InputSearchComponent,
    ScrollingModule,
  ],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent {
  @Input() pokemons: PokemonInit[] = [];
  pokemonNameSelected: string[] = [];
  searchQuery: string = '';

  constructor(private store: Store<AppState>, private router: Router) {}

  getIdFromURL(url?: string): number {
    if (!url) return 0;

    const splittedUrl = url.split('/');
    const id = splittedUrl[splittedUrl.length - 2];

    if (isNaN(Number(id))) return 0;

    return Number(id);
  }

  getImageUrl(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`;
  }

  handleClick(pokemonName: string) {
    if (!pokemonName) return;

    const isPokemonSelected = this.pokemonNameSelected.find(
      (name) => name === pokemonName
    );

    if (isPokemonSelected) {
      this.pokemonNameSelected = this.pokemonNameSelected.filter(
        (name) => name !== pokemonName
      );
      return;
    }

    this.pokemonNameSelected.push(pokemonName);
  }

  isSelected(pokemonName: string): boolean {
    if (!pokemonName) return false;

    const found = this.pokemonNameSelected.find((name) => name === pokemonName);
    return found ? true : false;
  }

  onSubmit() {
    if (this.pokemonNameSelected.length < 3) return;
    const pokemonList: PokemonInit[] = this.pokemonNameSelected.map(
      (pokemonName) => {
        return this.pokemons.find((pokemon) => pokemon.name === pokemonName);
      }
    ) as PokemonInit[];

    this.store.dispatch(setPokemonSelected({ data: pokemonList }));
    this.router.navigateByUrl('/home');
  }

  filterPokemons(pokemonList: PokemonInit[], query: string): PokemonInit[] {
    if (!query) return pokemonList;
    if (!pokemonList) return [];

    return pokemonList.filter((pokemon) => {
      if (this.getIdFromURL(pokemon.url).toString() === query) return true;
      return pokemon.name.includes(query);
    });
  }

  handleSearch(query: string) {
    this.searchQuery = query;
  }
}
