import { Component } from '@angular/core';
import { LoadingFullScreenComponent } from '../../shared/loading-full-screen/loading-full-screen.component';

@Component({
  selector: 'app-select-pokemons',
  standalone: true,
  imports: [LoadingFullScreenComponent],
  templateUrl: './select-pokemons.component.html',
  styleUrl: './select-pokemons.component.scss',
})
export class SelectPokemonsComponent {}
