import { Component, Input, OnInit } from '@angular/core';
import { CardPokemonHomeComponent } from '../card-pokemon-home/card-pokemon-home.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { Pokemon } from '../../interfaces/Pokemon';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-pokemon-list-home',
  standalone: true,
  imports: [CardPokemonHomeComponent, ButtonComponent, ScrollingModule],
  templateUrl: './pokemon-list-home.component.html',
  styleUrl: './pokemon-list-home.component.scss',
})
export class PokemonListHomeComponent {
  @Input() pokemons: Pokemon[] = [];
}
