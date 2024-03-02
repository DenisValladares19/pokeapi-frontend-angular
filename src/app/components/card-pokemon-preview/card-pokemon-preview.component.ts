import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PadLeftPipe } from '../../pipes/pad-left.pipe';

@Component({
  selector: 'app-card-pokemon-preview',
  standalone: true,
  imports: [PadLeftPipe],
  templateUrl: './card-pokemon-preview.component.html',
  styleUrl: './card-pokemon-preview.component.scss',
})
export class CardPokemonPreviewComponent {
  @Input() image: string = '';
  @Input() id: number = 0;
  @Input() name: string = '';
  @Input() isSelected: boolean = false;
  @Input() disabled: boolean = false;
  @Output() onSelectPokemon = new EventEmitter<string>();

  getClassName(): string {
    const defaultClassName = 'container-card-preview';

    if (this.isSelected) {
      return `${defaultClassName} selected`;
    }

    if (this.disabled) {
      return `${defaultClassName} disabled`;
    }

    return defaultClassName;
  }

  handleClick() {
    if (this.disabled && !this.isSelected) return;
    this.onSelectPokemon.emit(this.name);
  }
}
