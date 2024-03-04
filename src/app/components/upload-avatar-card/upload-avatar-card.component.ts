import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AvatarComponent } from '../../shared/avatar/avatar.component';
import { MatIconModule } from '@angular/material/icon';
import { getBase64 } from '../../shared/Base64.utils';
import { FormatFilenamePipe } from '../../pipes/format-filename.pipe';
import { Observable } from 'rxjs';
import { Profile } from '../../interfaces/Profile';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { selectProfileData } from '../../store/selectors/Profile.selector';

@Component({
  selector: 'app-upload-avatar-card',
  standalone: true,
  imports: [AvatarComponent, MatIconModule, FormatFilenamePipe],
  templateUrl: './upload-avatar-card.component.html',
  styleUrl: './upload-avatar-card.component.scss',
})
export class UploadAvatarCardComponent implements OnInit {
  imageUrl: string = '';
  filename: string = '';
  @Output() onUpload = new EventEmitter<{
    imageUrl: string;
    filename: string;
  }>();

  private profile$: Observable<Profile>;

  constructor(private store: Store<AppState>) {
    this.profile$ = this.store.select(selectProfileData);
  }
  ngOnInit(): void {
    this.profile$.subscribe({
      next: (profile) => {
        this.imageUrl = profile.image;
        this.filename = profile.filename;
        this.onUpload.emit({
          filename: profile.filename,
          imageUrl: profile.image,
        });
      },
    });
  }

  async handleUploadImage(event: Event) {
    if (!event.target) return;

    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (!files) return;

    this.filename = files[0].name;
    this.imageUrl = await getBase64(files[0]);
    this.onUpload.emit({ filename: this.filename, imageUrl: this.imageUrl });
  }

  handleDeleteImage(): void {
    this.filename = '';
    this.imageUrl = '';
    this.onUpload.emit({ filename: '', imageUrl: '' });
  }
}
