import { Component, EventEmitter, Output } from '@angular/core';
import { AvatarComponent } from '../../shared/avatar/avatar.component';
import { MatIconModule } from '@angular/material/icon';
import { getBase64 } from '../../shared/Base64.utils';

@Component({
  selector: 'app-upload-avatar-card',
  standalone: true,
  imports: [AvatarComponent, MatIconModule],
  templateUrl: './upload-avatar-card.component.html',
  styleUrl: './upload-avatar-card.component.scss',
})
export class UploadAvatarCardComponent {
  imageUrl: string = '';
  filename: string = '';
  @Output() onUpload = new EventEmitter<string>();

  async handleUploadImage(event: Event) {
    if (!event.target) return;

    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (!files) return;

    this.filename = files[0].name;
    this.imageUrl = await getBase64(files[0]);
    this.onUpload.emit(this.imageUrl);
  }

  handleDeleteImage(): void {
    this.filename = '';
    this.imageUrl = '';
    this.onUpload.emit('');
  }
}
