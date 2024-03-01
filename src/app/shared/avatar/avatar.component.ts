import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent {
  @Input() imageUrl: string = '';

  defaultImage: string = '/assets/images/default-user.png';

  isDefault(): boolean {
    return !this.imageUrl;
  }
}
