import { Component } from '@angular/core';
import { TitleComponent } from '../../shared/title/title.component';
import { UploadAvatarCardComponent } from '../../components/upload-avatar-card/upload-avatar-card.component';
import { FormProfileComponent } from '../../components/form-profile/form-profile.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Observable } from 'rxjs';
import { Profile } from '../../interfaces/Profile';
import { selectProfileData } from '../../store/selectors/Profile.selector';

@Component({
  selector: 'app-create-profile',
  standalone: true,
  imports: [TitleComponent, UploadAvatarCardComponent, FormProfileComponent],
  templateUrl: './create-profile.component.html',
  styleUrl: './create-profile.component.scss',
})
export class CreateProfileComponent {
  imageUrl: string = '';
  filename: string = '';

  onChangeImageUrl(data: { imageUrl: string; filename: string }): void {
    this.imageUrl = data.imageUrl;
    this.filename = data.filename;
  }
}
