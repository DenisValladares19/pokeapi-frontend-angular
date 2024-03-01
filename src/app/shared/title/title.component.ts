import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [MatIconModule, RouterModule],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss',
})
export class TitleComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() redirectTo: string = '';
}
