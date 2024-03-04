import { Component, Input } from '@angular/core';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';
import { Pokemon } from '../../interfaces/Pokemon';

@Component({
  selector: 'app-card-pokemon-home',
  standalone: true,
  imports: [ProgressBarComponent],
  templateUrl: './card-pokemon-home.component.html',
  styleUrl: './card-pokemon-home.component.scss',
})
export class CardPokemonHomeComponent {
  @Input() pokemon?: Pokemon;
}
