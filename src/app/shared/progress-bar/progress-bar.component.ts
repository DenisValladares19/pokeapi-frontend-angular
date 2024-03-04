import { Component, Input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [MatProgressBarModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
})
export class ProgressBarComponent {
  @Input() color: string = 'green';
  @Input() progress: number = 10;

  constructor() {
    document.documentElement.style.setProperty(
      '--mdc-linear-progress-active-indicator-height',
      '15px'
    );
    document.documentElement.style.setProperty(
      '--mdc-linear-progress-track-height',
      '15px'
    );
  }
}
