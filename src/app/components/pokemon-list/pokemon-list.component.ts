import { Component, Input } from '@angular/core';
import { CardPokemonPreviewComponent } from '../card-pokemon-preview/card-pokemon-preview.component';
import { PokemonInit } from '../../interfaces/Pokemon.init';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CardPokemonPreviewComponent, ButtonComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent {
  @Input() pokemons: PokemonInit[] = [];
  pokemonNameSelected: string[] = [];

  getIdFromURL(url?: string): number {
    if (!url) return 0;

    const splittedUrl = url.split('/');
    const id = splittedUrl[splittedUrl.length - 2];

    if (isNaN(Number(id))) return 0;

    return Number(id);
  }

  getImageUrl(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
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
}
