import { Component } from '@angular/core';
import { TitleComponent } from '../../shared/title/title.component';
import { UploadAvatarCardComponent } from '../../components/upload-avatar-card/upload-avatar-card.component';
import { FormProfileComponent } from '../../components/form-profile/form-profile.component';

@Component({
  selector: 'app-create-profile',
  standalone: true,
  imports: [TitleComponent, UploadAvatarCardComponent, FormProfileComponent],
  templateUrl: './create-profile.component.html',
  styleUrl: './create-profile.component.scss',
})
export class CreateProfileComponent {
  imageUrl: string = '';

  onChangeImageUrl(url: string): void {
    this.imageUrl = url;
  }
}
