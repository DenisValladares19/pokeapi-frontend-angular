import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-input-search',
  standalone: true,
  imports: [MatIconModule, FormsModule],
  templateUrl: './input-search.component.html',
  styleUrl: './input-search.component.scss',
})
export class InputSearchComponent {
  @Output() onSearch = new EventEmitter<string>();
  value: string = '';

  handleChange(query: string) {
    this.onSearch.emit(query);
  }
}
