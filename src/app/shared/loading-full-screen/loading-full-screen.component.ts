import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-full-screen',
  standalone: true,
  imports: [],
  templateUrl: './loading-full-screen.component.html',
  styleUrl: './loading-full-screen.component.scss',
})
export class LoadingFullScreenComponent {
  @Input() title: string = 'Cargando...';
}
