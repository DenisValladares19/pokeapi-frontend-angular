import { Component, Input } from '@angular/core';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';
import { Pokemon, Stat } from '../../interfaces/Pokemon';
import { maxStat } from '../../shared/Stats.utils';

@Component({
  selector: 'app-card-pokemon-home',
  standalone: true,
  imports: [ProgressBarComponent],
  templateUrl: './card-pokemon-home.component.html',
  styleUrl: './card-pokemon-home.component.scss',
})
export class CardPokemonHomeComponent {
  @Input() pokemon?: Pokemon;

  getProgress(stat: Stat): number {
    const maximum = maxStat[stat.name as keyof typeof maxStat];
    return (stat.base_stat * 100) / maximum;
  }
}
